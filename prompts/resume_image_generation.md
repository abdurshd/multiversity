# Resume Image Generation Task

## Objective
The goal is to generate missing character images for the Multiversity application. We have been using the `generate_image` tool to create historical portraits.

## Current Status
**Last Updated:** 2025-11-30
**Blocker:** Rate Limit on `generate_image` tool (approx. 4-5 hours wait from last attempt).

### Completed Chapters (All Images Generated & Moved)
- **AI Revolution** (All done)
- **Cold War** (All done)
- **USSR Collapse** (All done)
- **Russian Empire** (All done)

### In Progress Chapters
- **Hitler's Rise**
    - [x] Joseph Goebbels
    - [x] Paul von Hindenburg
    - [x] Gustav Stresemann
    - [ ] **Adolf Hitler** (Failed - Safety Filter)
    - [ ] **Heinrich Himmler** (Failed - Safety Filter)
    - [ ] **Ernst Röhm** (Failed - Safety Filter)
- **Lenin Revolution**
    - [x] Vladimir Lenin
    - [x] Leon Trotsky
    - [x] Joseph Stalin (Younger)
    - [x] Alexandra Kollontai
    - [ ] **Felix Dzerzhinsky** (Blocked by Rate Limit)
    - [ ] **Nikolai Bukharin** (Pending)

### Pending Chapters (Not Started)
- **World War 1**
- **World War 2**
- **Lincoln Era**
- **COVID Pandemic**
- **Future Earth**

## Instructions for Next Agent
1.  **Check Rate Limit**: Try generating one image (e.g., Felix Dzerzhinsky). If it fails with 429, wait or notify user.
2.  **Generate Images**: Use the prompts below for the pending characters.
3.  **Move Images**: After generating, move the image from the artifact folder to the correct path: `public/images/chapters/[chapter-slug]/people/[character-id].png`.
4.  **Update Task**: Update `task.md` as you go.

## Prompts for Pending Images

### Lenin Revolution (`lenin-revolution`)
| Character | Prompt |
| :--- | :--- |
| **Felix Dzerzhinsky** | `A high-quality historical portrait of Felix Dzerzhinsky. Wearing a military tunic or coat. Goatee. Cold, piercing eyes. Style: Early 20th-century portrait style.` |
| **Nikolai Bukharin** | `A high-quality historical portrait of Nikolai Bukharin. Wearing a suit. Young, intellectual, slightly boyish face. Style: Early 20th-century portrait style.` |

### World War I (`world-war-1`)
| Character | Prompt |
| :--- | :--- |
| **Kaiser Wilhelm II** | `A high-quality historical portrait of Kaiser Wilhelm II. Wearing German military uniform with Pickelhaube helmet or peaked cap. Stern expression, distinctive mustache. Style: Early 20th-century portrait style.` |
| **Archduke Franz Ferdinand** | `A high-quality historical portrait of Archduke Franz Ferdinand. Wearing Austro-Hungarian military uniform. Distinguished look with mustache. Style: Early 20th-century portrait style.` |
| **Erich von Falkenhayn** | `A high-quality historical portrait of Erich von Falkenhayn. German general uniform. Serious, strategic expression. Style: Early 20th-century portrait style.` |
| **Ferdinand Foch** | `A high-quality historical portrait of Ferdinand Foch. French military uniform. Determined expression. Style: Early 20th-century portrait style.` |
| **Douglas Haig** | `A high-quality historical portrait of Douglas Haig. British military uniform. Stoic expression. Style: Early 20th-century portrait style.` |
| **Manfred von Richthofen** | `A high-quality portrait of Manfred von Richthofen, the Red Baron. Wearing pilot gear, leather jacket, maybe goggles. Confident expression. Background hinting at a red triplane. Style: Realistic digital painting.` |

### World War II (`world-war-2`)
| Character | Prompt |
| :--- | :--- |
| **Winston Churchill** | `A high-quality historical portrait of Winston Churchill. Wearing a suit and bow tie, maybe holding a cigar. Determined, "bulldog" expression. Style: Mid-20th-century portrait style.` |
| **Franklin D. Roosevelt** | `A high-quality historical portrait of Franklin D. Roosevelt. Wearing a suit, charismatic and reassuring smile. Style: Mid-20th-century portrait style.` |
| **Joseph Stalin** | `A high-quality historical portrait of Joseph Stalin. Wearing Soviet military tunic. Stern, imposing expression. Distinctive mustache. Style: Mid-20th-century portrait style.` |
| **Dwight D. Eisenhower** | `A high-quality historical portrait of Dwight D. Eisenhower. US military uniform. Calm, authoritative expression. Style: Mid-20th-century portrait style.` |
| **George S. Patton** | `A high-quality historical portrait of George S. Patton. US general uniform with helmet. Tough, aggressive expression. Style: Mid-20th-century portrait style.` |
| **Bernard Montgomery** | `A high-quality historical portrait of Bernard Montgomery. British military uniform with beret. Sharp, focused expression. Style: Mid-20th-century portrait style.` |
| **Erwin Rommel** | `A high-quality historical portrait of Erwin Rommel. German military uniform, maybe with goggles. Respected military leader look. Style: Mid-20th-century portrait style.` |
| **Hirohito** | `A high-quality historical portrait of Emperor Hirohito. Wearing formal dress or military uniform. Reserved expression. Style: Mid-20th-century portrait style.` |

### Lincoln Era (`lincoln-era`)
| Character | Prompt |
| :--- | :--- |
| **Jefferson Davis** | `A high-quality historical portrait of Jefferson Davis. 1860s style suit. Gaunt, serious expression. Style: 19th-century photography/painting style.` |
| **Robert E. Lee** | `A high-quality historical portrait of Robert E. Lee. Confederate grey uniform. White beard, dignified but sad expression. Style: 19th-century photography/painting style.` |
| **Ulysses S. Grant** | `A high-quality historical portrait of Ulysses S. Grant. Union blue uniform. Beard, determined, slightly disheveled look. Style: 19th-century photography/painting style.` |
| **Frederick Douglass** | `A high-quality historical portrait of Frederick Douglass. 19th-century suit. Intense, intelligent gaze, distinctive hair. Style: 19th-century photography/painting style.` |
| **Harriet Tubman** | `A high-quality historical portrait of Harriet Tubman. 19th-century clothing, headscarf. Strong, determined expression. Style: 19th-century photography/painting style.` |
| **Abraham Lincoln** | `A high-quality historical portrait of Abraham Lincoln. Wearing a suit and stovepipe hat (optional). Beard. Melancholy, wise expression. Style: 19th-century photography/painting style.` |

### COVID Pandemic (`covid-pandemic`)
| Character | Prompt |
| :--- | :--- |
| **Dr. Li Wenliang** | `A high-quality portrait of Dr. Li Wenliang. Wearing medical scrubs or white coat, possibly a face mask pulled down. Young, kind, concerned expression. Style: Modern realistic digital painting.` |
| **Dr. Anthony Fauci** | `A high-quality portrait of Dr. Anthony Fauci. Wearing a suit or white coat. Glasses. Serious, explanatory expression. Style: Modern realistic digital painting.` |
| **Tedros Adhanom** | `A high-quality portrait of Tedros Adhanom Ghebreyesus. Wearing a suit. Glasses. Serious, diplomatic expression. Style: Modern realistic digital painting.` |

### Future Earth (`future-earth`)
| Character | Prompt |
| :--- | :--- |
| **Homo Sapiens** | `A high-quality artistic representation of Homo Sapiens. A composite face of humanity, diverse and timeless. Looking upward towards the stars. Style: Futuristic/Artistic digital painting.` |
| **The Swarm** | `A high-quality artistic representation of "The Swarm". A cloud of tiny, metallic, insect-like drones forming a vague face or shape. Futuristic, technological. Style: Sci-fi digital art.` |
| **The Traveler** | `A high-quality artistic representation of "The Traveler". A post-biological entity, perhaps made of light or energy, with a humanoid silhouette. Ethereal, wise. Style: Sci-fi digital art.` |
