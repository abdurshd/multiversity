// Speculative civic recovery, not a forecast or operational guidance.
import type { ExperienceScript } from '../types';
export const futureEarthScript: ExperienceScript = {
    "chapterId": "future-earth",
    "title": "After the Tide",
    "era": "An imagined estuary · 2086",
    "startBeat": "arrival",
    "initialStats": {
        "chaos": 0,
        "freedom": 0,
        "diplomacy": 0,
        "strength": 0
    },
    "defaultEnding": "water-gap",
    "beats": {
        "arrival": {
            "kind": "cinematic",
            "id": "arrival",
            "environment": "future-estuary",
            "next": "survey",
            "shots": [
                {
                    "path": [
                        [
                            58,
                            36,
                            64
                        ],
                        [
                            38,
                            24,
                            46
                        ],
                        [
                            23,
                            14,
                            30
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -12
                        ]
                    ],
                    "duration": 24,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "ESTUARY DISTRICT · 2086. An imagined coastal city wakes after an imagined storm. Raised walkways are dry, but the water plant, shelter and communications hub have lost service.",
                    "hold": 4
                },
                {
                    "text": "You coordinate two repair shifts, not the planet. Inspect the district, schedule finite crews and power, then explain the gaps to residents. No countdown forces a choice.",
                    "hold": 4
                },
                {
                    "text": "This is speculative fiction, not a forecast or emergency procedure. Infrastructure dependencies are real; this district, storm, budgets, technology and outcomes are invented. Tokens do not predict emissions, casualties or flood depths.",
                    "hold": 4
                }
            ]
        },
        "survey": {
            "kind": "explore",
            "id": "survey",
            "environment": "future-estuary",
            "prompt": "Read the district before repairing it.",
            "camera": {
                "position": [
                    34,
                    25,
                    45
                ],
                "target": [
                    0,
                    4,
                    -10
                ]
            },
            "hotspots": [
                {
                    "id": "future-water",
                    "position": [
                        -23,
                        4,
                        -20
                    ],
                    "label": "Water works",
                    "title": "A pump is part of a network",
                    "description": "Context: electricity outages can disrupt water and wastewater operations. Fiction: our water station needs one crew token and two sustained power tokens. Restoring a pump alone does not certify drinking-water safety."
                },
                {
                    "id": "future-energy",
                    "position": [
                        22,
                        5,
                        -26
                    ],
                    "label": "Microgrid yard",
                    "title": "Capacity arrives next shift",
                    "description": "Fiction: two power tokens remain. Spending two crew tokens on the substation raises capacity to four only NEXT shift. Services already restored keep using power. Repair order matters."
                },
                {
                    "id": "future-shelter",
                    "position": [
                        -16,
                        4,
                        10
                    ],
                    "label": "Civic shelter",
                    "title": "Access is more than a door",
                    "description": "Context: infrastructure failures can cascade between services. Fiction: the shelter needs one crew and one power token; the public signal hub needs the same. A lit building is not a complete evacuation or care plan."
                },
                {
                    "id": "future-shore",
                    "position": [
                        18,
                        3,
                        15
                    ],
                    "label": "Living shoreline",
                    "title": "Protection has limits",
                    "description": "Context: structural and ecosystem-based adaptation can be combined; local conditions matter. Fiction: quay access costs two crew tokens, a rain garden one. Neither makes this city flood-proof or substitutes for essential services."
                },
                {
                    "id": "future-board",
                    "position": [
                        0,
                        4,
                        -7
                    ],
                    "label": "Open the repair board",
                    "title": "Two shifts. No perfect package.",
                    "description": "Each shift supplies three crew tokens. Unused crew tokens do not carry over. Choose a set, review it, then dispatch. You can undo selections before dispatch and restart the whole planning exercise.",
                    "advancesTo": "dispatch"
                }
            ]
        },
        "dispatch": {
            "kind": "choice",
            "id": "dispatch",
            "environment": "future-estuary",
            "camera": {
                "position": [
                    34,
                    25,
                    45
                ],
                "target": [
                    0,
                    4,
                    -10
                ]
            },
            "title": "The repair board",
            "prompt": "Choose projects for two shifts. Completed services keep consuming power.",
            "options": [
                {
                    "id": "review",
                    "label": "Take the record to residents",
                    "description": "After two shifts, review what works and what still needs help.",
                    "flags": [],
                    "next": "hearing"
                }
            ]
        },
        "hearing": {
            "kind": "cinematic",
            "id": "hearing",
            "environment": "future-forum",
            "next": "accountability",
            "shots": [
                {
                    "path": [
                        [
                            58,
                            36,
                            64
                        ],
                        [
                            38,
                            24,
                            46
                        ],
                        [
                            23,
                            14,
                            30
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -12
                        ]
                    ],
                    "duration": 24,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "The repair window closes. Some services return; others remain on the list. The district is not saved by a score. Residents need an honest account of what still does not work.",
                    "hold": 4
                },
                {
                    "text": "In this imagined forum, a contractor offers a single rapid approval channel. Residents propose public repair logs and a review panel. Neither creates extra crews; the choice changes who can question the next decisions.",
                    "hold": 4
                }
            ]
        },
        "accountability": {
            "kind": "choice",
            "id": "accountability",
            "environment": "future-forum",
            "camera": {
                "position": [
                    22,
                    15,
                    28
                ],
                "target": [
                    0,
                    3,
                    -5
                ]
            },
            "title": "Who gets to challenge the plan?",
            "prompt": "Review your repair record. Then choose a rule for the next, unseen recovery phase.",
            "options": [
                {
                    "id": "public",
                    "label": "Publish the gaps; share review power",
                    "description": "Residents can question priorities, inspect contracts and propose accessible alternatives. Deliberation takes time; transparency alone does not repair a service.",
                    "flags": [
                        "future:public"
                    ],
                    "next": "debrief"
                },
                {
                    "id": "closed",
                    "label": "Keep approval inside the contractor team",
                    "description": "One approval channel is simpler, but residents cannot independently inspect the priority list. Do not confuse a shorter process with consent.",
                    "flags": [
                        "future:closed"
                    ],
                    "next": "debrief"
                }
            ]
        },
        "debrief": {
            "kind": "cinematic",
            "id": "debrief",
            "environment": "future-estuary",
            "next": "ending",
            "shots": [
                {
                    "path": [
                        [
                            58,
                            36,
                            64
                        ],
                        [
                            38,
                            24,
                            46
                        ],
                        [
                            23,
                            14,
                            30
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -12
                        ]
                    ],
                    "duration": 24,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "The lights that returned do not erase the gaps. Revisit the two shifts to see how sequencing changed what was possible. This chapter measures only its own invented rules, not the safety or future of any real community.",
                    "hold": 4
                }
            ]
        },
        "ending": {
            "kind": "ending",
            "id": "ending"
        }
    },
    "endings": [
        {
            "id": "connected",
            "title": "A connected recovery",
            "subtitle": "Speculative outcome · services and scrutiny",
            "epilogue": [
                {
                    "text": "Water service, shelter and the signal hub operate under this model. The public record keeps unfinished work visible. This is a promising opening, not a prediction of resilience; long-term funding, maintenance and unequal access remain unresolved."
                }
            ],
            "requiresFlags": [
                "future:water",
                "future:shelter",
                "future:signal",
                "future:public"
            ],
            "forbidsFlags": [],
            "priority": 90,
            "icon": "◈",
            "color": "#84d8cf"
        },
        {
            "id": "access",
            "title": "An accessible but quiet district",
            "subtitle": "Speculative outcome · access before communications",
            "epilogue": [
                {
                    "text": "Essential services and the quay access route return. The public signal hub remains offline, so residents cannot rely on that channel for updates. A repaired route does not guarantee safe evacuation; the next plan still needs accessible communication."
                }
            ],
            "requiresFlags": [
                "future:water",
                "future:shelter",
                "future:quay",
                "future:public"
            ],
            "forbidsFlags": [
                "future:signal"
            ],
            "priority": 80,
            "icon": "◈",
            "color": "#84d8cf"
        },
        {
            "id": "basic",
            "title": "The essentials, with gaps",
            "subtitle": "Speculative outcome · an incomplete network",
            "epilogue": [
                {
                    "text": "Water service and shelter return, but public communications and quay access remain unfinished. Open review makes those omissions contestable. It cannot turn two shifts into a complete recovery."
                }
            ],
            "requiresFlags": [
                "future:water",
                "future:shelter",
                "future:public"
            ],
            "forbidsFlags": [
                "future:signal",
                "future:quay"
            ],
            "priority": 70,
            "icon": "◈",
            "color": "#84d8cf"
        },
        {
            "id": "opaque",
            "title": "Working systems, a closed ledger",
            "subtitle": "Speculative outcome · an accountability gap",
            "epilogue": [
                {
                    "text": "Water and shelter operate, but decisions stay inside the contractor team. The public cannot independently examine who was deferred or why. Useful repairs and democratic accountability are different achievements."
                }
            ],
            "requiresFlags": [
                "future:water",
                "future:shelter",
                "future:closed"
            ],
            "forbidsFlags": [],
            "priority": 85,
            "icon": "◈",
            "color": "#84d8cf"
        },
        {
            "id": "water-gap",
            "title": "The missing water link",
            "subtitle": "Speculative outcome · water service unresolved",
            "epilogue": [
                {
                    "text": "The water station is still offline in this model. Other repairs may help, but they do not substitute for this service. The next recovery phase must address water access and safety with qualified operators, not assume that a green indicator elsewhere is enough."
                }
            ],
            "requiresFlags": [],
            "forbidsFlags": [
                "future:water"
            ],
            "priority": 60,
            "icon": "◈",
            "color": "#84d8cf"
        },
        {
            "id": "shelter-gap",
            "title": "A service without a refuge",
            "subtitle": "Speculative outcome · shelter unresolved",
            "epilogue": [
                {
                    "text": "Water service returns, but the civic shelter remains offline. Residents do not experience recovery as a single citywide score. The next phase must address shelter access, care and communication; the model cannot tell you how many people were helped or harmed."
                }
            ],
            "requiresFlags": [
                "future:water"
            ],
            "forbidsFlags": [
                "future:shelter"
            ],
            "priority": 60,
            "icon": "◈",
            "color": "#84d8cf"
        }
    ]
};
