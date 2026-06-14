import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zwjoendwxibjemrswfzi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am9lbmR3eGliamVtcnN3ZnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MTYwNTMsImV4cCI6MjA5Njk5MjA1M30.xzCKbSOGCnL0f4Mk6ySIy0257_X5nkNDo9M8rJwHa7I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Session Management ────────────────────────────────────────────────────────
// Each browser gets a stable anonymous UUID stored in localStorage.
// This is the lightweight identity that ties tokens/unlocks to a browser session.
const SESSION_KEY = 'curriculum_ai_session_id';

export function getSessionId() {
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
        sid = crypto.randomUUID();
        localStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
}

// ─── Balance Helpers ───────────────────────────────────────────────────────────

/** Fetch current balances from Supabase, initialising row if first visit. */
export async function getBalances() {
    const sid = getSessionId();
    let { data, error } = await supabase
        .from('user_balances')
        .select('audit_tokens, lead_unlocks')
        .eq('session_id', sid)
        .single();

    if (error || !data) {
        // First visit — create default row
        const { data: newRow } = await supabase
            .from('user_balances')
            .upsert({ session_id: sid, audit_tokens: 5, lead_unlocks: 5 }, { onConflict: 'session_id' })
            .select('audit_tokens, lead_unlocks')
            .single();
        return newRow || { audit_tokens: 5, lead_unlocks: 5 };
    }
    return data;
}

/** Add tokens to the audit_tokens balance. */
export async function addAuditTokens(amount) {
    const sid = getSessionId();
    const current = await getBalances();
    const next = (current.audit_tokens || 0) + amount;
    await supabase
        .from('user_balances')
        .upsert({ session_id: sid, audit_tokens: next, updated_at: new Date().toISOString() }, { onConflict: 'session_id' });
    window.dispatchEvent(new Event('balance-update'));
    return next;
}

/** Add tokens to the lead_unlocks balance. */
export async function addLeadUnlocks(amount) {
    const sid = getSessionId();
    const current = await getBalances();
    const next = (current.lead_unlocks || 0) + amount;
    await supabase
        .from('user_balances')
        .upsert({ session_id: sid, lead_unlocks: next, updated_at: new Date().toISOString() }, { onConflict: 'session_id' });
    window.dispatchEvent(new Event('balance-update'));
    return next;
}

/** Decrement audit_tokens by 1. Returns new balance or -1 if insufficient. */
export async function consumeAuditToken() {
    const sid = getSessionId();
    const current = await getBalances();
    if (current.audit_tokens <= 0) return -1;
    const next = current.audit_tokens - 1;
    await supabase
        .from('user_balances')
        .upsert({ session_id: sid, audit_tokens: next, updated_at: new Date().toISOString() }, { onConflict: 'session_id' });
    window.dispatchEvent(new Event('balance-update'));
    return next;
}

/** Decrement lead_unlocks by 1. Returns new balance or -1 if insufficient. */
export async function consumeLeadUnlock() {
    const sid = getSessionId();
    const current = await getBalances();
    if (current.lead_unlocks <= 0) return -1;
    const next = current.lead_unlocks - 1;
    await supabase
        .from('user_balances')
        .upsert({ session_id: sid, lead_unlocks: next, updated_at: new Date().toISOString() }, { onConflict: 'session_id' });
    window.dispatchEvent(new Event('balance-update'));
    return next;
}

// ─── Unlock Helpers ────────────────────────────────────────────────────────────

/** Returns Set of unlocked entity IDs for a given type ('company' | 'expert'). */
export async function getUnlocked(entityType) {
    const sid = getSessionId();
    const { data } = await supabase
        .from('unlocked_contacts')
        .select('entity_id')
        .eq('session_id', sid)
        .eq('entity_type', entityType);
    return new Set((data || []).map(r => r.entity_id));
}

/** Records an unlock for a given entity. Ignores duplicate (UNIQUE constraint). */
export async function recordUnlock(entityType, entityId) {
    const sid = getSessionId();
    await supabase
        .from('unlocked_contacts')
        .upsert(
            { session_id: sid, entity_type: entityType, entity_id: String(entityId) },
            { onConflict: 'session_id,entity_type,entity_id' }
        );
}
