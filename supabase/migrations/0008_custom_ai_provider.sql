-- =========================================================================
-- ai_providers: support custom OpenAI-compatible providers, in addition to
-- the fixed openai/anthropic/openrouter. A custom provider needs a
-- user-given label (to tell several apart) and a base URL to call.
-- =========================================================================
alter table ai_providers drop constraint ai_providers_provider_check;
alter table ai_providers add constraint ai_providers_provider_check
  check (provider in ('openai', 'anthropic', 'openrouter', 'custom'));

alter table ai_providers add column label text;
alter table ai_providers add column base_url text;

alter table ai_providers add constraint ai_providers_custom_requires_fields
  check (provider <> 'custom' or (label is not null and base_url is not null));

-- Only one row per fixed provider per user (unchanged), but many custom ones.
alter table ai_providers drop constraint ai_providers_user_id_provider_key;
create unique index ai_providers_user_provider_uidx on ai_providers (user_id, provider)
  where provider <> 'custom';
