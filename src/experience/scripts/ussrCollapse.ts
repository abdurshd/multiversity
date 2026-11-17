import type { ExperienceScript } from '../types';

/** Fictional liaison simulation; factual checkpoints and counterfactual outcomes are explicit. */
export const ussrCollapseScript: ExperienceScript = {
  "chapterId": "ussr-collapse",
  "title": "The Last Union",
  "era": "1991 · Authority, consent, survival",
  "startBeat": "arrival",
  "initialStats": {
    "chaos": 45,
    "freedom": 40,
    "diplomacy": 40,
    "strength": 45
  },
  "beats": {
    "arrival": {
      "kind": "cinematic",
      "id": "arrival",
      "environment": "union-square-1991",
      "next": "square",
      "shots": [
        {
          "path": [
            [
              42,
              28,
              48
            ],
            [
              23,
              14,
              30
            ],
            [
              13,
              8,
              19
            ]
          ],
          "lookPath": [
            [
              0,
              3,
              -12
            ],
            [
              0,
              2,
              -6
            ]
          ],
          "duration": 18,
          "fov": 48
        }
      ],
      "narration": [
        {
          "text": "Historical frame · August 1991. The coup against Mikhail Gorbachev fails. The Union government survives the immediate crisis, but its authority is weakened. Republics are not pieces on a board.",
          "hold": 5
        },
        {
          "text": "You are a fictional inter-republic liaison, not a president. Inspect reports, propose terms, and keep civilians safe. Meetings and locations are compressed composites; your decisions are counterfactual experiments, not historical quotations.",
          "hold": 5
        }
      ]
    },
    "square": {
      "kind": "explore",
      "id": "square",
      "environment": "union-square-1991",
      "camera": {
        "position": [
          34,
          24,
          44
        ],
        "target": [
          0,
          2,
          -8
        ]
      },
      "prompt": "August dispatches · Read all three",
      "hotspots": [
        {
          "id": "mandates",
          "position": [
            -17,
            2,
            -10
          ],
          "label": "Republic delegations",
          "title": "No single mandate",
          "description": "Russia, Ukraine, Belarus and the Central Asian republics have distinct leaders and interests. The Baltic states seek restored independence. You cannot grant yourself the authority to speak for them.",
          "closeUp": {
            "path": [
              [
                -5,
                12,
                6
              ],
              [
                -9,
                8,
                2
              ]
            ],
            "lookPath": [
              [
                -17,
                2,
                -10
              ]
            ],
            "duration": 2
          }
        },
        {
          "id": "queues",
          "position": [
            15,
            2,
            6
          ],
          "label": "Supply queue",
          "title": "The household ledger",
          "description": "Production and trade disruptions already strain daily life. A new border does not create spare railway wagons, food or wages. Treat distribution as a public responsibility, not a reward for political loyalty.",
          "closeUp": {
            "path": [
              [
                27,
                12,
                22
              ],
              [
                23,
                8,
                18
              ]
            ],
            "lookPath": [
              [
                15,
                2,
                6
              ]
            ],
            "duration": 2
          }
        },
        {
          "id": "radio",
          "position": [
            15,
            2,
            -13
          ],
          "label": "Public radio",
          "title": "Orders have limits",
          "description": "The failed August coup exposed divisions inside state institutions. An order on paper is not consent in the street. Protect public assembly and civilian routes while rival authorities argue.",
          "closeUp": {
            "path": [
              [
                27,
                12,
                3
              ],
              [
                23,
                8,
                -1
              ]
            ],
            "lookPath": [
              [
                15,
                2,
                -13
              ]
            ],
            "duration": 2
          }
        },
        {
          "id": "square-continue",
          "position": [
            0,
            2,
            -14
          ],
          "label": "Enter the meeting",
          "title": "Briefing complete",
          "description": "Read the three dispatches before deciding.",
          "advancesTo": "mandate"
        }
      ]
    },
    "mandate": {
      "kind": "choice",
      "id": "mandate",
      "environment": "union-square-1991",
      "camera": {
        "position": [
          34,
          24,
          44
        ],
        "target": [
          0,
          2,
          -8
        ]
      },
      "title": "01 · Legitimacy",
      "prompt": "What authority can your proposal claim?",
      "options": [
        {
          "id": "consent",
          "label": "Seek separate mandates",
          "description": "Publish terms, invite republic representatives, and accept their right to refuse. Slower talks, broader consent.",
          "effects": {
            "freedom": 20,
            "diplomacy": 12,
            "strength": -5
          },
          "flags": [
            "consent"
          ],
          "next": "dialogue"
        },
        {
          "id": "pressure",
          "label": "Demand central compliance",
          "description": "Use emergency directives to accelerate decisions. Institutions may resist; coercion cannot substitute for public legitimacy.",
          "effects": {
            "chaos": 18,
            "freedom": -18,
            "diplomacy": -10
          },
          "flags": [
            "pressure"
          ],
          "next": "pressure"
        }
      ]
    },
    "dialogue": {
      "kind": "cinematic",
      "id": "dialogue",
      "environment": "union-hall-1991",
      "next": "winter",
      "shots": [
        {
          "path": [
            [
              42,
              28,
              48
            ],
            [
              23,
              14,
              30
            ],
            [
              13,
              8,
              19
            ]
          ],
          "lookPath": [
            [
              0,
              3,
              -12
            ],
            [
              0,
              2,
              -6
            ]
          ],
          "duration": 18,
          "fov": 48
        }
      ],
      "narration": [
        {
          "text": "Scenario consequence · Invitations bring competing mandates to the table. Some delegations discuss cooperation only between sovereign states. Listening wins a hearing, not a promise to preserve the Union.",
          "hold": 5
        }
      ]
    },
    "pressure": {
      "kind": "cinematic",
      "id": "pressure",
      "environment": "union-square-1991",
      "next": "winter",
      "shots": [
        {
          "path": [
            [
              42,
              28,
              48
            ],
            [
              23,
              14,
              30
            ],
            [
              13,
              8,
              19
            ]
          ],
          "lookPath": [
            [
              0,
              3,
              -12
            ],
            [
              0,
              2,
              -6
            ]
          ],
          "duration": 18,
          "fov": 48
        }
      ],
      "narration": [
        {
          "text": "Scenario consequence · Your directive reaches offices, but it does not create a shared mandate. Officials dispute who may authorize it. Civilian services lose time while the chain of authority is contested.",
          "hold": 5
        }
      ]
    },
    "winter": {
      "kind": "explore",
      "id": "winter",
      "environment": "union-hall-1991",
      "camera": {
        "position": [
          19,
          17,
          25
        ],
        "target": [
          0,
          2,
          -4
        ]
      },
      "prompt": "Autumn working session · Inspect the ledger",
      "hotspots": [
        {
          "id": "freight",
          "position": [
            -7,
            2,
            -4
          ],
          "label": "Freight ledger",
          "title": "Interdependence",
          "description": "Factories depend on suppliers across republic boundaries. A temporary transport agreement can protect deliveries without deciding the constitutional future of every republic.",
          "closeUp": {
            "path": [
              [
                5,
                12,
                12
              ],
              [
                1,
                8,
                8
              ]
            ],
            "lookPath": [
              [
                -7,
                2,
                -4
              ]
            ],
            "duration": 2
          }
        },
        {
          "id": "households",
          "position": [
            7,
            2,
            -4
          ],
          "label": "Social guarantees",
          "title": "Promises need delivery",
          "description": "Pensions, wages and heating need functioning institutions. Our simplified service meter measures your priorities, not GDP or a historical statistic. No single agreement can erase the economic crisis.",
          "closeUp": {
            "path": [
              [
                19,
                12,
                12
              ],
              [
                15,
                8,
                8
              ]
            ],
            "lookPath": [
              [
                7,
                2,
                -4
              ]
            ],
            "duration": 2
          }
        },
        {
          "id": "rights",
          "position": [
            0,
            2,
            -14
          ],
          "label": "Rights memorandum",
          "title": "Citizens are not bargaining chips",
          "description": "People live across languages and administrative borders. Discuss residency, equal treatment and family contact. Independence and minority rights must be considered together, not traded against each other.",
          "closeUp": {
            "path": [
              [
                12,
                12,
                2
              ],
              [
                8,
                8,
                -2
              ]
            ],
            "lookPath": [
              [
                0,
                2,
                -14
              ]
            ],
            "duration": 2
          }
        },
        {
          "id": "winter-continue",
          "position": [
            0,
            2,
            -14
          ],
          "label": "Enter the meeting",
          "title": "Briefing complete",
          "description": "Read the three dispatches before deciding.",
          "advancesTo": "logistics"
        }
      ]
    },
    "logistics": {
      "kind": "choice",
      "id": "logistics",
      "environment": "union-hall-1991",
      "camera": {
        "position": [
          19,
          17,
          25
        ],
        "target": [
          0,
          2,
          -4
        ]
      },
      "title": "02 · Winter services",
      "prompt": "How will essential deliveries continue?",
      "options": [
        {
          "id": "joint",
          "label": "Negotiate a temporary supply compact",
          "description": "Share transport schedules and protect essential deliveries. Joint oversight costs time but preserves links across borders.",
          "effects": {
            "strength": 18,
            "diplomacy": 10,
            "chaos": -8
          },
          "flags": [
            "supply"
          ],
          "next": "distribution"
        },
        {
          "id": "local",
          "label": "Reserve stocks locally",
          "description": "Answer local needs immediately. Neighbours may withhold their own supplies; a chain of reciprocal restrictions risks shortages.",
          "effects": {
            "strength": 5,
            "diplomacy": -12,
            "chaos": 12
          },
          "flags": [
            "local"
          ],
          "next": "distribution"
        }
      ]
    },
    "distribution": {
      "kind": "choice",
      "id": "distribution",
      "environment": "union-hall-1991",
      "camera": {
        "position": [
          19,
          17,
          25
        ],
        "target": [
          0,
          2,
          -4
        ]
      },
      "title": "03 · Civilian protection",
      "prompt": "Which obligation belongs in every agreement?",
      "options": [
        {
          "id": "rights",
          "label": "Guarantee equal access and review",
          "description": "Write civilian passage, minority protections and public complaints procedures into the proposal. Enforcement remains difficult.",
          "effects": {
            "freedom": 12,
            "chaos": -8
          },
          "flags": [
            "rights"
          ],
          "next": "december"
        },
        {
          "id": "defer",
          "label": "Leave guarantees to successor governments",
          "description": "Reduce the immediate negotiating burden, but leave households with uncertain rights during the transition.",
          "effects": {
            "chaos": 8,
            "freedom": -5
          },
          "flags": [
            "defer"
          ],
          "next": "december"
        }
      ]
    },
    "december": {
      "kind": "cinematic",
      "id": "december",
      "environment": "union-hall-1991",
      "next": "settlement",
      "shots": [
        {
          "path": [
            [
              42,
              28,
              48
            ],
            [
              23,
              14,
              30
            ],
            [
              13,
              8,
              19
            ]
          ],
          "lookPath": [
            [
              0,
              3,
              -12
            ],
            [
              0,
              2,
              -6
            ]
          ],
          "duration": 18,
          "fov": 48
        }
      ],
      "narration": [
        {
          "text": "Historical checkpoint · On 1 December, more than 90 percent of participating Ukrainian voters support independence. On 8 December, the leaders of Belarus, Russia and Ukraine sign the agreement creating the CIS.",
          "hold": 5
        },
        {
          "text": "Your fictional proposal cannot cancel a real referendum. Choose cooperation between sovereign states, or test an explicitly counterfactual voluntary association. Any republic may refuse.",
          "hold": 5
        }
      ]
    },
    "settlement": {
      "kind": "choice",
      "id": "settlement",
      "environment": "union-hall-1991",
      "camera": {
        "position": [
          19,
          17,
          25
        ],
        "target": [
          0,
          2,
          -4
        ]
      },
      "title": "04 · The December settlement",
      "prompt": "What future can you legitimately propose?",
      "options": [
        {
          "id": "sovereign",
          "label": "Recognize sovereign partners",
          "description": "Negotiate practical cooperation without claiming a new central state. Your earlier service and rights choices shape the transition.",
          "effects": {
            "diplomacy": 8
          },
          "flags": [
            "sovereign"
          ],
          "next": "safety"
        },
        {
          "id": "association",
          "label": "Offer an opt-in association",
          "description": "Counterfactual: seek new democratic mandates for a limited association. No automatic membership, no restored empire, no guaranteed success.",
          "effects": {
            "diplomacy": -4
          },
          "flags": [
            "association"
          ],
          "next": "safety"
        },
        {
          "id": "record",
          "label": "Set the scenario aside: historical record",
          "description": "Read the documented December sequence instead of treating a simulated outcome as fact.",
          "effects": {},
          "flags": [
            "record"
          ],
          "next": "ending"
        }
      ]
    },
    "safety": {
      "kind": "choice",
      "id": "safety",
      "environment": "union-hall-1991",
      "camera": {
        "position": [
          19,
          17,
          25
        ],
        "target": [
          0,
          2,
          -4
        ]
      },
      "title": "05 · A dangerous inheritance",
      "prompt": "How do you limit the risks of divided authority?",
      "options": [
        {
          "id": "coordination",
          "label": "Agree on accountable coordination",
          "description": "Maintain civilian communications and negotiate strategic-force arrangements. This is a policy decision, not a weapons-control simulation.",
          "effects": {
            "chaos": -12,
            "diplomacy": 10
          },
          "flags": [
            "coordination"
          ],
          "next": "departure"
        },
        {
          "id": "rival",
          "label": "Allow competing command claims",
          "description": "Assert local control before agreements are settled. Conflicting instructions increase uncertainty; the model does not predict a war.",
          "effects": {
            "chaos": 20,
            "diplomacy": -15
          },
          "flags": [
            "rival"
          ],
          "next": "departure"
        }
      ]
    },
    "departure": {
      "kind": "cinematic",
      "id": "departure",
      "environment": "union-square-1991",
      "next": "ending",
      "shots": [
        {
          "path": [
            [
              42,
              28,
              48
            ],
            [
              23,
              14,
              30
            ],
            [
              13,
              8,
              19
            ]
          ],
          "lookPath": [
            [
              0,
              3,
              -12
            ],
            [
              0,
              2,
              -6
            ]
          ],
          "duration": 18,
          "fov": 48
        }
      ],
      "narration": [
        {
          "text": "Scenario debrief · There is no victory parade. The test is whether institutions can protect people while political authority changes. Your ledger shows trade-offs, not a prediction of prosperity or peace.",
          "hold": 5
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
      "id": "record",
      "title": "December, as documented",
      "subtitle": "Historical record · Not your simulated result",
      "icon": "◈",
      "color": "#8ad6d0",
      "priority": 100,
      "requiresFlags": [
        "record"
      ],
      "forbidsFlags": [],
      "epilogue": [
        {
          "text": "On 21 December 1991, eleven republics adopted the Alma-Ata Declaration. The CIS was not a new federal state. The Baltic states and Georgia were not among those eleven participants."
        },
        {
          "text": "Gorbachev resigned on 25 December. Sovereignty did not remove economic disruption or unresolved conflicts. Agreements about rights and security were commitments to implement, not proof that everyone was safe."
        }
      ]
    },
    {
      "id": "authority",
      "title": "An order without a mandate",
      "subtitle": "Counterfactual · The limits of central authority",
      "icon": "◈",
      "color": "#8ad6d0",
      "priority": 90,
      "requiresFlags": [
        "pressure"
      ],
      "forbidsFlags": [],
      "epilogue": [
        {
          "text": "Your emergency approach leaves a deficit of trust that later technical agreements cannot simply repair. The proposal stalls amid contested authority. This illustrates a risk, not an assertion that repression would have restored stability."
        }
      ]
    },
    {
      "id": "compact",
      "title": "A voluntary table, not a restored Union",
      "subtitle": "Counterfactual · Consent remains conditional",
      "icon": "◈",
      "color": "#8ad6d0",
      "priority": 80,
      "requiresFlags": [
        "consent",
        "supply",
        "rights",
        "association",
        "coordination"
      ],
      "forbidsFlags": [],
      "epilogue": [
        {
          "text": "Separate mandates, supply cooperation and rights guarantees keep a limited association under discussion. No republic is enrolled by force. New votes and enforceable agreements would still be required; the USSR is not magically preserved."
        }
      ]
    },
    {
      "id": "protected",
      "title": "Separation with a civilian safety net",
      "subtitle": "Counterfactual · Cooperation without a central state",
      "icon": "◈",
      "color": "#8ad6d0",
      "priority": 70,
      "requiresFlags": [
        "consent",
        "supply",
        "rights",
        "sovereign",
        "coordination"
      ],
      "forbidsFlags": [],
      "epilogue": [
        {
          "text": "Your package protects transport links, civilian rights and accountable coordination while recognizing sovereignty. It may soften some transition risks, but it cannot promise growth, eliminate conflict or settle every claim."
        }
      ]
    },
    {
      "id": "fragmented",
      "title": "Unfinished obligations",
      "subtitle": "Counterfactual · Independence does not finish the work",
      "icon": "◈",
      "color": "#8ad6d0",
      "priority": 0,
      "requiresFlags": [],
      "forbidsFlags": [],
      "epilogue": [
        {
          "text": "Your package leaves gaps in supply, rights, consent or coordination. Sovereign governments still need workable arrangements for people whose lives cross new borders. Replay to see which missing commitments change the outcome."
        }
      ]
    }
  ],
  "defaultEnding": "fragmented"
};
