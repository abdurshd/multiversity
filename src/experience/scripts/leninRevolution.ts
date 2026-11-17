// A fictional district delegate explores the real political dilemmas of 1917.
import type { ExperienceScript } from '../types';

export const leninRevolutionScript: ExperienceScript = {
    "chapterId": "lenin-revolution",
    "title": "Petrograd: The Weight of a Promise",
    "era": "Petrograd · September 1917 – January 1918",
    "startBeat": "arrival",
    "initialStats": {
        "chaos": 45,
        "freedom": 45,
        "diplomacy": 40,
        "strength": 40
    },
    "defaultEnding": "brittle",
    "beats": {
        "arrival": {
            "id": "arrival",
            "kind": "cinematic",
            "environment": "petrograd-1917",
            "next": "district",
            "shots": [
                {
                    "path": [
                        [
                            35,
                            24,
                            48
                        ],
                        [
                            18,
                            13,
                            28
                        ],
                        [
                            11,
                            7,
                            16
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -16
                        ],
                        [
                            0,
                            3,
                            -10
                        ]
                    ],
                    "duration": 22,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "PETROGRAD · September 1917. The monarchy has fallen, but war and hunger endure. The Provisional Government and the soviets compete for authority.",
                    "hold": 4
                },
                {
                    "text": "You guide a fictional Bolshevik district delegate, not an all-powerful Lenin. Listen to residents, bargain over supplies, then decide who may govern. All dialogue is dramatized.",
                    "hold": 4
                },
                {
                    "text": "Historical anchor: after the Kornilov crisis, Lenin briefly proposed a compromise with other socialist parties. Our branching negotiations are invented possibilities, not events that happened.",
                    "hold": 4
                }
            ]
        },
        "district": {
            "id": "district",
            "kind": "explore",
            "environment": "petrograd-1917",
            "camera": {
                "position": [
                    26,
                    19,
                    35
                ],
                "target": [
                    0,
                    3,
                    -12
                ]
            },
            "prompt": "Listen before you decide. Select a place below or in the city.",
            "hotspots": [
                {
                    "id": "lenin-bread",
                    "position": [
                        -14,
                        2,
                        3
                    ],
                    "label": "Bread queue",
                    "title": "A city cannot eat a slogan",
                    "description": "Historical context: wartime shortages and inflation helped undermine the government. This fictional worker asks for a published ration ledger, not another promise.",
                    "closeUp": {
                        "path": [
                            [
                                -5,
                                8,
                                19
                            ],
                            [
                                -8,
                                6,
                                13
                            ]
                        ],
                        "lookPath": [
                            [
                                -14,
                                2,
                                3
                            ]
                        ],
                        "duration": 2
                    }
                },
                {
                    "id": "lenin-rail",
                    "position": [
                        17,
                        2,
                        -18
                    ],
                    "label": "Railway dispatch",
                    "title": "The line that feeds Petrograd",
                    "description": "Historical context: rail workers were a political force. In this fictional district, railway delegates will move grain if elected committees can inspect deliveries.",
                    "closeUp": {
                        "path": [
                            [
                                26,
                                8,
                                -2
                            ],
                            [
                                23,
                                6,
                                -8
                            ]
                        ],
                        "lookPath": [
                            [
                                17,
                                2,
                                -18
                            ]
                        ],
                        "duration": 2
                    }
                },
                {
                    "id": "lenin-press",
                    "position": [
                        -17,
                        2,
                        -20
                    ],
                    "label": "Printing room",
                    "title": "Who may disagree?",
                    "description": "Historical context: socialist parties disagreed over war, land and power. Soviets were elected councils, not a single party. Our council room compresses different meetings into one setting.",
                    "closeUp": {
                        "path": [
                            [
                                -8,
                                8,
                                -4
                            ],
                            [
                                -11,
                                6,
                                -10
                            ]
                        ],
                        "lookPath": [
                            [
                                -17,
                                2,
                                -20
                            ]
                        ],
                        "duration": 2
                    }
                },
                {
                    "id": "lenin-council",
                    "position": [
                        0,
                        3,
                        -37
                    ],
                    "label": "Enter negotiations",
                    "title": "A mandate, not a blank cheque",
                    "description": "Begin the fictional negotiation. Each commitment changes who will trust you later. You can inspect the other locations first; no timer forces a decision.",
                    "closeUp": {
                        "path": [
                            [
                                9,
                                8,
                                -21
                            ],
                            [
                                6,
                                6,
                                -27
                            ]
                        ],
                        "lookPath": [
                            [
                                0,
                                3,
                                -37
                            ]
                        ],
                        "duration": 2
                    },
                    "advancesTo": "supply"
                }
            ]
        },
        "supply": {
            "id": "supply",
            "kind": "choice",
            "environment": "petrograd-1917",
            "camera": {
                "position": [
                    26,
                    19,
                    35
                ],
                "target": [
                    0,
                    3,
                    -12
                ]
            },
            "title": "01 / Bread before power",
            "prompt": "A fictional grain train waits outside the city. Railway and neighbourhood delegates demand oversight. What can you promise?",
            "options": [
                {
                    "id": "ledger",
                    "label": "Publish a joint ration ledger",
                    "description": "Share inspection with elected workers and residents. Slower bargaining buys trust.",
                    "effects": {
                        "diplomacy": 18,
                        "freedom": 8,
                        "strength": -5
                    },
                    "flags": [
                        "accountable"
                    ],
                    "next": "ledger-result"
                },
                {
                    "id": "guards",
                    "label": "Seize the dispatch office",
                    "description": "Move the train under armed orders. You gain immediate leverage but railway delegates remember the threat.",
                    "effects": {
                        "strength": 15,
                        "chaos": 12,
                        "freedom": -15
                    },
                    "flags": [
                        "coerced"
                    ],
                    "next": "guards-result"
                },
                {
                    "id": "defer",
                    "label": "Leave supply to the ministry",
                    "description": "Avoid a confrontation, but give residents no way to hold your committee responsible.",
                    "effects": {
                        "diplomacy": -8,
                        "chaos": 8
                    },
                    "flags": [
                        "deferred"
                    ],
                    "next": "defer-result"
                }
            ]
        },
        "ledger-result": {
            "id": "ledger-result",
            "kind": "cinematic",
            "environment": "petrograd-1917",
            "next": "mandate",
            "shots": [
                {
                    "path": [
                        [
                            35,
                            24,
                            48
                        ],
                        [
                            18,
                            13,
                            28
                        ],
                        [
                            11,
                            7,
                            16
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -16
                        ],
                        [
                            0,
                            3,
                            -10
                        ]
                    ],
                    "duration": 22,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "Invented consequence: the first wagons unload under joint inspection. Your committee has less unilateral power, but railway delegates agree to stay at the negotiating table.",
                    "hold": 4
                }
            ]
        },
        "guards-result": {
            "id": "guards-result",
            "kind": "cinematic",
            "environment": "petrograd-1917",
            "next": "mandate",
            "shots": [
                {
                    "path": [
                        [
                            35,
                            24,
                            48
                        ],
                        [
                            18,
                            13,
                            28
                        ],
                        [
                            11,
                            7,
                            16
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -16
                        ],
                        [
                            0,
                            3,
                            -10
                        ]
                    ],
                    "duration": 22,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "Invented consequence: grain arrives under guard. Some railway delegates withdraw. Coercion solves a dispatch problem while creating a legitimacy problem.",
                    "hold": 4
                }
            ]
        },
        "defer-result": {
            "id": "defer-result",
            "kind": "cinematic",
            "environment": "petrograd-1917",
            "next": "mandate",
            "shots": [
                {
                    "path": [
                        [
                            35,
                            24,
                            48
                        ],
                        [
                            18,
                            13,
                            28
                        ],
                        [
                            11,
                            7,
                            16
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -16
                        ],
                        [
                            0,
                            3,
                            -10
                        ]
                    ],
                    "duration": 22,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "Invented consequence: the ministry promises action, but the queue lengthens. Your delegation enters the council without a supply agreement.",
                    "hold": 4
                }
            ]
        },
        "mandate": {
            "id": "mandate",
            "kind": "choice",
            "environment": "smolny-1917",
            "camera": {
                "position": [
                    18,
                    13,
                    25
                ],
                "target": [
                    0,
                    3,
                    -8
                ]
            },
            "title": "02 / Who holds the mandate?",
            "prompt": "October approaches. Lenin urges a transfer of power; socialist rivals fear one-party rule. This fictional conference can pursue three incompatible strategies.",
            "options": [
                {
                    "id": "plural",
                    "label": "Build a broad socialist agreement",
                    "description": "Negotiate a government accountable to plural soviets. You must share authority and accept opposition.",
                    "effects": {
                        "diplomacy": 15,
                        "strength": -8
                    },
                    "flags": [
                        "plural"
                    ],
                    "next": "plural-bridge"
                },
                {
                    "id": "party",
                    "label": "Back Bolshevik seizure of power",
                    "description": "Support the uprising. Control of the capital does not settle how the country should be governed.",
                    "effects": {
                        "strength": 18,
                        "chaos": 12
                    },
                    "flags": [
                        "party"
                    ],
                    "next": "party-bridge"
                },
                {
                    "id": "election",
                    "label": "Wait for the Constituent Assembly",
                    "description": "Reject an immediate seizure and seek authority through national elections. Delay carries its own risks.",
                    "effects": {
                        "freedom": 15,
                        "strength": -10
                    },
                    "flags": [
                        "election"
                    ],
                    "next": "election-bridge"
                }
            ],
            "cast": [
                {
                    "id": "lenin",
                    "position": [
                        0,
                        2,
                        -24
                    ],
                    "facing": 0,
                    "pose": "think"
                }
            ]
        },
        "plural-bridge": {
            "id": "plural-bridge",
            "kind": "cinematic",
            "environment": "smolny-1917",
            "next": "plural-rights",
            "shots": [
                {
                    "path": [
                        [
                            35,
                            24,
                            48
                        ],
                        [
                            18,
                            13,
                            28
                        ],
                        [
                            11,
                            7,
                            16
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -16
                        ],
                        [
                            0,
                            3,
                            -10
                        ]
                    ],
                    "duration": 22,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "Counterfactual branch: rival socialist delegates remain in our conference. They ask whether a promise of pluralism survives criticism of the new government.",
                    "hold": 4
                }
            ],
            "cast": [
                {
                    "id": "lenin",
                    "position": [
                        0,
                        2,
                        -24
                    ],
                    "facing": 0,
                    "pose": "think"
                }
            ]
        },
        "party-bridge": {
            "id": "party-bridge",
            "kind": "cinematic",
            "environment": "smolny-1917",
            "next": "party-rights",
            "shots": [
                {
                    "path": [
                        [
                            35,
                            24,
                            48
                        ],
                        [
                            18,
                            13,
                            28
                        ],
                        [
                            11,
                            7,
                            16
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -16
                        ],
                        [
                            0,
                            3,
                            -10
                        ]
                    ],
                    "duration": 22,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "Historical anchor: Bolshevik-led forces took key points in Petrograd on 24–25 October (6–7 November, Gregorian). Our delegate now confronts an invented choice about limits on the new power.",
                    "hold": 4
                }
            ],
            "cast": [
                {
                    "id": "lenin",
                    "position": [
                        0,
                        2,
                        -24
                    ],
                    "facing": 0,
                    "pose": "think"
                }
            ]
        },
        "election-bridge": {
            "id": "election-bridge",
            "kind": "cinematic",
            "environment": "smolny-1917",
            "next": "election-rights",
            "shots": [
                {
                    "path": [
                        [
                            35,
                            24,
                            48
                        ],
                        [
                            18,
                            13,
                            28
                        ],
                        [
                            11,
                            7,
                            16
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -16
                        ],
                        [
                            0,
                            3,
                            -10
                        ]
                    ],
                    "duration": 22,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "Counterfactual branch: your committee refuses to take power before an election. The army is disintegrating and land disputes continue; a ballot cannot magically end either crisis.",
                    "hold": 4
                }
            ],
            "cast": [
                {
                    "id": "lenin",
                    "position": [
                        0,
                        2,
                        -24
                    ],
                    "facing": 0,
                    "pose": "think"
                }
            ]
        },
        "plural-rights": {
            "id": "plural-rights",
            "kind": "choice",
            "environment": "smolny-1917",
            "camera": {
                "position": [
                    18,
                    13,
                    25
                ],
                "target": [
                    0,
                    3,
                    -8
                ]
            },
            "title": "03 / The right to oppose",
            "prompt": "A fictional newspaper attacks your committee. Will coalition partners be able to challenge you publicly?",
            "options": [
                {
                    "id": "protect",
                    "label": "Guarantee open debate and elections",
                    "description": "Keep the press open. Your earlier supply bargain determines whether partners believe the guarantee.",
                    "effects": {
                        "freedom": 20
                    },
                    "flags": [
                        "protect"
                    ],
                    "next": "reflection"
                },
                {
                    "id": "censor",
                    "label": "Suspend hostile papers",
                    "description": "Call censorship temporary. Partners see that dissent now depends on your permission.",
                    "effects": {
                        "freedom": -25,
                        "chaos": 15
                    },
                    "flags": [
                        "censor"
                    ],
                    "next": "reflection"
                }
            ],
            "cast": [
                {
                    "id": "lenin",
                    "position": [
                        0,
                        2,
                        -24
                    ],
                    "facing": 0,
                    "pose": "think"
                }
            ]
        },
        "party-rights": {
            "id": "party-rights",
            "kind": "choice",
            "environment": "smolny-1917",
            "camera": {
                "position": [
                    18,
                    13,
                    25
                ],
                "target": [
                    0,
                    3,
                    -8
                ]
            },
            "title": "03 / Victory is not consent",
            "prompt": "The new authorities face rival claims from the elected Constituent Assembly. In history it was dispersed in January 1918. What principle will your delegate defend?",
            "options": [
                {
                    "id": "protect",
                    "label": "Accept an independent assembly",
                    "description": "Counterfactual: accept a rival mandate, even if it can remove your party from office.",
                    "effects": {
                        "freedom": 20,
                        "diplomacy": 10
                    },
                    "flags": [
                        "protect"
                    ],
                    "next": "reflection"
                },
                {
                    "id": "dissolve",
                    "label": "Place soviet power above the assembly",
                    "description": "Follow the historical direction of dissolution. Eliminating a rival institution restricts political choice.",
                    "effects": {
                        "freedom": -30,
                        "strength": 15
                    },
                    "flags": [
                        "dissolve"
                    ],
                    "next": "reflection"
                }
            ],
            "cast": [
                {
                    "id": "lenin",
                    "position": [
                        0,
                        2,
                        -24
                    ],
                    "facing": 0,
                    "pose": "think"
                }
            ]
        },
        "election-rights": {
            "id": "election-rights",
            "kind": "choice",
            "environment": "smolny-1917",
            "camera": {
                "position": [
                    18,
                    13,
                    25
                ],
                "target": [
                    0,
                    3,
                    -8
                ]
            },
            "title": "03 / A promise needs a date",
            "prompt": "Your fictional alliance must choose between a binding election commitment and emergency rule.",
            "options": [
                {
                    "id": "protect",
                    "label": "Bind the committee to the vote",
                    "description": "Accept the result and independent oversight. Cooperation still depends on your treatment of the railway workers.",
                    "effects": {
                        "freedom": 15,
                        "diplomacy": 8
                    },
                    "flags": [
                        "protect"
                    ],
                    "next": "reflection"
                },
                {
                    "id": "delay",
                    "label": "Postpone until order returns",
                    "description": "An emergency without an end date leaves residents with another unelected authority.",
                    "effects": {
                        "chaos": 15,
                        "freedom": -20
                    },
                    "flags": [
                        "delay"
                    ],
                    "next": "reflection"
                }
            ],
            "cast": [
                {
                    "id": "lenin",
                    "position": [
                        0,
                        2,
                        -24
                    ],
                    "facing": 0,
                    "pose": "think"
                }
            ]
        },
        "reflection": {
            "id": "reflection",
            "kind": "cinematic",
            "environment": "petrograd-1917",
            "next": "end",
            "shots": [
                {
                    "path": [
                        [
                            35,
                            24,
                            48
                        ],
                        [
                            18,
                            13,
                            28
                        ],
                        [
                            11,
                            7,
                            16
                        ]
                    ],
                    "lookPath": [
                        [
                            0,
                            4,
                            -16
                        ],
                        [
                            0,
                            3,
                            -10
                        ]
                    ],
                    "duration": 22,
                    "fov": 48
                }
            ],
            "narration": [
                {
                    "text": "Your decisions cannot predict a century. This short simulation tests consent, supply and coercion, not whether one leader could guarantee peace. The ending separates the historical record from your invented outcome.",
                    "hold": 4
                }
            ]
        },
        "end": {
            "kind": "ending",
            "id": "end"
        }
    },
    "endings": [
        {
            "id": "coalition",
            "title": "A table with more than one voice",
            "subtitle": "Counterfactual · accountable coalition",
            "icon": "◈",
            "color": "#d4a462",
            "requiresFlags": [
                "plural",
                "protect",
                "accountable"
            ],
            "priority": 90,
            "epilogue": [
                {
                    "text": "Your published supply agreement makes pluralism credible. In this invented outcome, rival socialists keep seats and a free press. War, land conflict and hunger remain; cooperation is a practice, not a guaranteed utopia."
                }
            ]
        },
        {
            "id": "assembly",
            "title": "The ballot remains open",
            "subtitle": "Counterfactual · an electoral bargain",
            "icon": "◈",
            "color": "#d4a462",
            "requiresFlags": [
                "election",
                "protect",
                "accountable"
            ],
            "priority": 90,
            "epilogue": [
                {
                    "text": "Your committee accepts oversight before asking for votes. The fictional alliance survives long enough to submit to an assembly. This does not prove that elections would have prevented civil war."
                }
            ]
        },
        {
            "id": "limited",
            "title": "Power accepts a boundary",
            "subtitle": "Counterfactual · a constrained victory",
            "icon": "◈",
            "color": "#d4a462",
            "requiresFlags": [
                "party",
                "protect"
            ],
            "priority": 80,
            "epilogue": [
                {
                    "text": "After supporting the uprising, you defend an institution that can challenge its victors. This invented compromise is precarious. Historical Bolshevik leaders instead dispersed the Constituent Assembly in January 1918."
                }
            ]
        },
        {
            "id": "consolidation",
            "title": "Power without a rival mandate",
            "subtitle": "Historical direction · not an exact replay",
            "icon": "◈",
            "color": "#d4a462",
            "requiresFlags": [
                "party",
                "dissolve"
            ],
            "priority": 85,
            "epilogue": [
                {
                    "text": "Your final choice follows the historical suppression of the assembly, but the district negotiation is fictional. The Bolsheviks consolidated power amid civil war and repression. Tactical control did not confer universal consent, and coercion carried immense human costs."
                }
            ]
        },
        {
            "id": "brittle",
            "title": "Promises without trust",
            "subtitle": "Counterfactual · a fragile settlement",
            "icon": "◈",
            "color": "#d4a462",
            "requiresFlags": [],
            "priority": 0,
            "epilogue": [
                {
                    "text": "Your fictional settlement cannot reconcile its promises with its methods. Censorship, coercion or unresolved supply leaves partners unwilling to rely on your guarantees. No outcome here makes dictatorship inevitable; institutional choices still matter."
                }
            ]
        }
    ],
    "characters": {
        "lenin": {
            "id": "lenin",
            "name": "Vladimir Lenin",
            "role": "Bolshevik leader · portrayal, not quoted dialogue",
            "face": "/images/chapters/lenin-revolution/faces/vladimir-lenin.webp",
            "outfit": "statesman",
            "balding": true,
            "hair": "#493f36",
            "skin": "#c69a75",
            "robe": "#343a40",
            "accent": "#72534a",
            "breeches": "#30363a"
        }
    }
};
