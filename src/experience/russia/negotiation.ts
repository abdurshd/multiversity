/** A deliberately small fictional negotiation model, not a historical forecast. */
export const PROPOSALS = [
    [{ id: 'stand-down', cost: 2, safety: 2, mandate: 0, rights: 0 }, { id: 'guarded-talks', cost: 1, safety: 1, mandate: 0, rights: 0 }],
    [{ id: 'civic-delegates', cost: 2, safety: 0, mandate: 2, rights: 0 }, { id: 'officers-only', cost: 0, safety: 0, mandate: 0, rights: 0 }],
    [{ id: 'abolition-mandate', cost: 2, safety: 0, mandate: 0, rights: 2 }, { id: 'defer-rights', cost: 0, safety: 0, mandate: 0, rights: 0 }],
] as const;
export interface NegotiationState { round: number; seals: number; safety: number; mandate: number; rights: number; choices: string[]; }
export const newNegotiation = (): NegotiationState => ({ round: 0, seals: 5, safety: 1, mandate: 1, rights: 0, choices: [] });
export function propose(state: NegotiationState, round: number, option: number): NegotiationState {
    if (round !== state.round || round >= PROPOSALS.length) return state;
    const proposal = PROPOSALS[round]?.[option];
    if (!proposal || proposal.cost > state.seals) return state;
    return { round: round + 1, seals: state.seals - proposal.cost, safety: state.safety + proposal.safety, mandate: state.mandate + proposal.mandate, rights: state.rights + proposal.rights, choices: [...state.choices, proposal.id] };
}
export function negotiationOutcome(state: NegotiationState): 'charter' | 'truce' | 'suppression' | null {
    if (state.round !== PROPOSALS.length) return null;
    if (state.safety >= 2 && state.mandate >= 3 && state.rights >= 2) return 'charter';
    if (state.safety >= 3) return 'truce';
    return 'suppression';
}
