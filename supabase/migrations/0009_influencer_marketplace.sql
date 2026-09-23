-- Amplibee pivot: from cross-platform auto-posting to influencer marketing.
-- Product owners brief a campaign (what to promote, the goal, suggested talking
-- points); influencers discover it in the network, apply, and post genuinely on
-- their own account, then submit a link as proof. Nothing is ever published on
-- anyone's behalf, so the old OAuth publish/schedule machinery is dropped along
-- with the tables that only existed to support it.
-- Pre-launch, no real rows to preserve — same destructive-migration approach as
-- 0007_custom_auth.sql.

drop table if exists analytics cascade;
drop table if exists backlinks cascade;
drop table if exists published_posts cascade;
drop table if exists scheduled_posts cascade;
drop table if exists generated_posts cascade;
drop table if exists source_posts cascade;
drop table if exists workflow_steps cascade;
drop table if exists workflows cascade;
drop table if exists connected_accounts cascade;
drop table if exists platforms cascade;

-- =========================================================================
-- campaigns — a product owner's brief: what they're promoting, why, and to
-- which channels. Replaces workflows + source_posts.
-- =========================================================================
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  user_id bigint not null references public.users(id) on delete cascade,
  name text not null,
  promotion_type text not null default 'saas_product' check (promotion_type in ('github_repo', 'saas_product', 'mobile_app', 'product_hunt_launch', 'blog_post', 'other')),
  product_url text,
  repo_url text,
  goal text not null default 'awareness' check (goal in ('stars', 'signups', 'downloads', 'awareness', 'traffic')),
  brief text not null default '',
  content_profile_id uuid references content_profiles(id) on delete set null,
  target_channels text[] not null default '{}',
  budget_type text not null default 'unpaid' check (budget_type in ('unpaid', 'paid', 'gifted')),
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'completed')),
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index campaigns_user_id_idx on campaigns(user_id);
create index campaigns_status_idx on campaigns(status);
create index campaigns_public_idx on campaigns(is_public) where is_public = true;

create trigger campaigns_set_updated_at
  before update on campaigns
  for each row execute function set_updated_at();

alter table campaigns enable row level security;

-- =========================================================================
-- campaign_briefs — AI-suggested talking points/captions per channel; an
-- editable starting point for the owner, or for an influencer who joins.
-- Replaces generated_posts.
-- =========================================================================
create table campaign_briefs (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  channel text not null check (channel in ('x', 'linkedin', 'youtube', 'instagram')),
  content text not null,
  status text not null default 'draft' check (status in ('draft', 'approved')),
  ai_provider text,
  ai_model text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index campaign_briefs_campaign_id_idx on campaign_briefs(campaign_id);

create trigger campaign_briefs_set_updated_at
  before update on campaign_briefs
  for each row execute function set_updated_at();

alter table campaign_briefs enable row level security;

-- =========================================================================
-- campaign_links — tracked URLs an owner hands to influencers, so clicks are
-- attributable without ever touching the anchor text they write themselves.
-- Replaces backlinks.
-- =========================================================================
create table campaign_links (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  destination_url text not null,
  tracked_url text not null,
  suggested_cta text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index campaign_links_campaign_id_idx on campaign_links(campaign_id);

create trigger campaign_links_set_updated_at
  before update on campaign_links
  for each row execute function set_updated_at();

alter table campaign_links enable row level security;

-- =========================================================================
-- campaign_applications — an influencer opting into a campaign from the
-- network before they post anything.
-- =========================================================================
create table campaign_applications (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  network_profile_id uuid not null references network_profiles(id) on delete cascade,
  channel text not null check (channel in ('x', 'linkedin', 'youtube', 'instagram')),
  message text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, network_profile_id, channel)
);

create index campaign_applications_campaign_id_idx on campaign_applications(campaign_id);
create index campaign_applications_network_profile_id_idx on campaign_applications(network_profile_id);

create trigger campaign_applications_set_updated_at
  before update on campaign_applications
  for each row execute function set_updated_at();

alter table campaign_applications enable row level security;

-- =========================================================================
-- campaign_deliverables — the actual proof: a link to the genuine post or
-- video an influencer published on their own account. Replaces
-- scheduled_posts + published_posts.
-- =========================================================================
create table campaign_deliverables (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  application_id uuid references campaign_applications(id) on delete set null,
  network_profile_id uuid not null references network_profiles(id) on delete cascade,
  channel text not null check (channel in ('x', 'linkedin', 'youtube', 'instagram')),
  content_url text not null,
  notes text,
  status text not null default 'submitted' check (status in ('submitted', 'approved', 'rejected')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index campaign_deliverables_campaign_id_idx on campaign_deliverables(campaign_id);
create index campaign_deliverables_status_idx on campaign_deliverables(status);

create trigger campaign_deliverables_set_updated_at
  before update on campaign_deliverables
  for each row execute function set_updated_at();

alter table campaign_deliverables enable row level security;

-- =========================================================================
-- campaign_metrics — self-reported or captured engagement for a deliverable.
-- Replaces analytics.
-- =========================================================================
create table campaign_metrics (
  id uuid primary key default gen_random_uuid(),
  deliverable_id uuid not null references campaign_deliverables(id) on delete cascade,
  impressions integer not null default 0,
  engagements integer not null default 0,
  clicks integer not null default 0,
  captured_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index campaign_metrics_deliverable_id_idx on campaign_metrics(deliverable_id);

alter table campaign_metrics enable row level security;

-- =========================================================================
-- network_profiles — extend for the influencer marketplace: the niches they
-- cover and how they're compensated, beyond the existing platforms[] list.
-- =========================================================================
alter table network_profiles
  add column if not exists niches text[] not null default '{}',
  add column if not exists rate_info text,
  add column if not exists portfolio_url text;
