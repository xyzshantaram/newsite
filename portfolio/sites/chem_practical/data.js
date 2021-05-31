const testData = {
    // SET 1

    odour:      new Test("Odour of the salt",
                    "Noted the odour of the given salt.",
                    {
                        "ammonium": "ammoniacal smell, indicating presence of ammonium ion.",
                        "acetate":  "vinegar like smell, indicating presence of acetate ion."
                    }
    ),

    dryHeating: new Test("Dry Heating test",
                    "Heated a little of the salt in a dry test tube.",
                    {   
                        "ammonium":  "Pungent-smelling gas giving dense white fumes when glass rod dipped in conc. HCl is introduced, indicating presence of ammonium ion.",
                        "nitrate":   "Salt decrepitates with evolution of Brown gas, indicating presence of nitrate ion.",
                        "zinc":      "Yellow when hot and white when cold, indicating presence of Zn<sup>2+</sup> ion.",
                        "carbonate": "brisk effervescence turning lime water milky, indicating presence of carbonate ion."
                    }
    ),

    ash:        new Test("Cobalt Nitrate test (Ash test)",
                    "Added cobalt nitrate and concentrated nitric acid to a little of the salt. Dipped a filter paper strip into this and burnt. Noted the ash colour.",
                    {   
                        "zinc":      "Green ash, indicating presence of zinc ion.",
                        "magnesium": "Pink/white ash, indicating presence of magnesium ion.",
                        "aluminium": "Blue ash, indicating presence of aluminium ion."
                    }
    ),
    flame:      new Test("Flame test",
                    "Prepared a paste of the salt in conc. HCl and burnt, and noted the colour of the flame.",
                    {   
                        "calcium":   "Brick red flame, indicating presence of calcium ion.",
                        "strontium": "crimson red flame, indicating presence of strontium ion.",
                        "barium":    "grassy green / apple green flame, indicating presence of barium ion."
                    }
    ),

    // SET 2

    KMnO4:           new Test("Potassium permanganate test",
                        "Added a few drops of dilute sulphuric acid, potassium permanganate, and heated.",
                        {
                            "chloride": "KMnO4 decolourised in cold with evolution of chlorine gas, indicating presence of chloride ion.",
                            "oxalate": "KMnO4 decolourised on warming, indicating presence of oxalate."
                        }
    ),
    
    ester:           new Test("Ester test",
                        "Added a few drops of ethanol, then conc. sulphuric acid, and heated.",
                        {
                            "acetate": "Fruity smell of ester is obtained, indicating acetate presence."
                        }
    ),

    cuTurnings:      new Test("Copper turnings test",
                        "Added copper turnings and sulphuric acid, and heated.",
                        {
                            "nitrate": "Reddish brown fumes evolved, indicating presence of nitrate ion."
                        }
    ),

    dilHydrochloric: new Test("dil. HCl test",
                        "To a little of the salt added dilute HCl.",
                        {
                            "carbonate": "Brisk effervescence with colorless, odorless gas turning lime water milky, indicating presence of carbonate ion."
                        }
    ),

    concSulphuric:   new Test("conc. H2SO4 test",
                        "To a little of the salt, added conc. sulphuric acid.",
                        {
                            "nitrate": "brown fumes evolved, indicating nitrate presence.",
                            "iodide": "violet vapours evolved. Upon addition of MnO2, more violet vapours are seen, indicating the presence of iodide ions.",
                            "chloride": "Pungent smelling gas that gives dense white fumes when glass rod dipped in ammonium hydroxide is introduced. Upon addition of MnO2, a greenish yellow gas is observed. These indicate the presence of chloride ions."
                        }
    ),

    chromylChloride: new Test("Chromyl chloride test",
                        "Mixed a little of the salt with K2Cr2O7 (potassium dichromate), added conc. sulphuric acid, and heated.",
                        {
                            "chloride": "Orange vapours of chromyl chloride condense on the walls of the test tube. When the vapours are acidified with NaOH and mixed with PbCH3COO (Lead acetate), a yellow solution and precipitate are observed, confirming chloride ions."
                        }
    ),

    // SET 3 - wet tests

    BaCl2: new Test(
            "Barium chloride test",
            "Neutralised the salt with dil. HCl until effervescence stopped and added BaCl2 solution.",
            {
                "sulphate": "White precipitate obtained, indicating sulphate ion."
            }
    ),
    PbCH3COO: new Test(
            "Lead acetate test",
            "Neutralised the salt with acetic acid until effervescence stopped and added lead acetate solution.",
            {
                "sulphate": "White precipitate obtained, indicating sulphate ion."
            }
    ),
    MM: new Test(
            "Magnesia mixture test",
            "Neutralised with dil. HCl until effervescence stopped and added magnesia mixture.",
            {
                "phosphate": "White precipitate obtained, indicating phosphate ion."
            }
    ),
    NH4MoO3: new Test(
            "Ammonium molybdate test",
            "Neutralised with conc. HNO3 until effervescence stopped and added ammonium molybdate solution.",
            {
                "phosphate": "Canary yellow precipitate was observed, indicating the presence of phosphate ion."
            }
    ),
    AgNO3: new Test(
            "Silver nitrate test",
            "Neutralised the salt with dilute nitric acid (HNO3), and then added silver nitrate in excess.",
            {
                "chloride": "Curdy white precipitate readily soluble in excess of ammonium hydroxide, indicating chloride ion."
            }
    ),
    FeCl3: new Test(
            "Ferric chloride test",
            "Added FeCl3 solution to a part of the water extract.",
            {
                "acetate": "Observed red coloration, indicating presence of acetate." +
                "<br><b>Confirmatory</b> When dil HCl is added to this red solution, the red coloration disappears, and when the red solution is heated with distilled water, a red precipitate is formed. These two tests confirm the presence of acetate ions."
            }
    ),
    brownRing: new Test(
        "Brown Ring test",
        "Added conc. sulphuric acid to the test tube. Waited until effervescence stopped, added freshly prepared solution, and then added conc. sulphuric acid on test tube walls.",
        {
            "nitrate": "Brown ring formed at the junction of the two layers, indicating nitrate presence."
        }
    ),

    // Group separations
    zero: new Test(
        "Zero group (Ammonium ion)",
        "Added a little sodium hydroxide to the salt and heated.",
        {
            "ammonium": "A pungent smelling gas giving dense white fumes when a glass rod dipped in hydrochloric acid is introduced was evolved, indicating presence of ammonium." +
            "<br><b>Confirmatory:</b> Added a few drops of Nessler's reagent and sodium hydroxide, which caused a brown precipitate to occur, confirming the presence of ammonium ion."
        }
    ),
    one: new Test(
        "Group 1 - Lead",
        "Added dil. HCl to a little of the salt solution.",
        {
            "lead": "A white precipitate was formed, indicating presence of lead ions." +
            "<br><b>To confirm:</b> Boiled the white precipitate, causing it to disappear and reappear as needle-shaped crystals on cooling. Divided the crystalline solution into two parts:" +
            "<br>1. To one added potassium iodide solution." +
            "<br>2. To the other added potassium chromate solution." +
            "<br> Both yielded a yellow precipitate, confirming the presence of lead ions."
        }
    ),
    three: new Test(
        "Group 3 - Aluminium",
        "Added ammonium chloride and hydroxide solutions to the salt solution.",
        {
            "aluminium": "A gelatinous white precipitate was obtained, indicating aluminium presence." +
            "<br><b>To confirm,</b> 1. Sodium hydroxide is added dropwise and then in excess. The NaOH dissolves the precipitate, indicating Al3+ ions." +
            "<br> 2. The precipitate is dissolved in HCl and a few drops of blue litmus solution along with ammonium hydroxide are added, causing a blue precipitate to float in the otherwise colorless solution."
        }
    ),
    four: new Test(
        "Group 4 - Zinc",
        "Added ammonium chloride and hydroxide solutions to the salt solution, then passed H<sub>2</sub>S gas through this mixture.",
        {
            "zinc": "A dirty white precipitate was formed, indicating presence of Zinc." +
            "<br><b>Confirmatory I</b> Potassium ferrocyanide test - blue/white precipitate obtained when potassium ferrocyanide solution is added." +
            "<br><b>Confirmatory II</b> NaOH - white precipitate obtained when sodium hydroxide is added dropwise."
        }
    ),
    five: new Test(
        "Group 5 - Calcium, Strontium, Barium",
        "Added ammonium chloride and hydroxide solutions to the salt solution, followed by an excess of ammonium carbonate.",
        {
            "calcium": "Got a white precipitate. Dissolved the white precipitate in hot acetic acid." +
            "<br><b>Confirmatory I</b> Neither adding potassium chromate nor adding ammonium sulphate caused a characteristic change, indicating absence of barium and strontium ions, but ammonium oxalate gave a white precipitate, confirming the presence of calcium ions." + 
            "<br><b>Confirmatory II</b> In addition, calcium salts give a brick red flame with the flame test.",
            "strontium": "Got a white precipitate. Dissolved the white precipitate in hot acetic acid." + 
            "<br><b>Confirmatory I</b> Adding potassium chromate did not cause a characteristic precipitate, but ammonium sulphate caused a white precipitate to appear confirming the presence of the strontium ion. " +
            "<br><b>Confirmatory II</b> In addition, strontium salts give a crimson red flame with the flame test.",
            "barium": "Got a white precipitate. Dissolved the white precipitate in hot acetic acid." +
            "<br><b>Confirmatory I</b> Adding potassium chromate caused a yellow precipitate to appear, confirming the presence of barium ions." +
            "<br><b>Confirmatory II</b> In addition, barium salts give a grassy green flame with the flame test."
        }
    ),
    six: new Test(
        "Group 6 - Magnesium",
        "Added ammonium chloride and hydroxide solutions to the salt solution, followed by a few drops of disodium hydrogen phosphate solution.",
        {
            "magnesium": "White precipitate was observed." +
            "<br><b>Confirmatory</b> Presence of magnesium can be confirmed through addition of Magneson reagent, which causes a sky blue precipitate to appear." +
            "<br><b>Additionally,</b> magnesium salts give a pink ash with the Cobalt Nitrate (ash) test."
        }
    )
}

const ionData = {
    anions: {
        "sulphate":  new Ion("sulphate",   ["ammonium", "magnesium", "calcium", "aluminium"],        -2),
        "chloride":  new Ion("chloride",   ["ammonium", "barium", "lead", "magnesium", "strontium", "calcium"], -1),
        "carbonate": new Ion("carbonate",  ["ammonium"],                                             -2),
        "oxalate":   new Ion("oxalate",    ["ammonium"],                                             -2),
        "phosphate": new Ion("phosphate",  [],                                                       -3), 
        "nitrate":   new Ion("nitrate",    ["barium", "lead", "aluminium"],                          -1),
        "acetate":   new Ion("acetate",    ["lead", "zinc"],                                         -1),
    },
    cations: {
        "ammonium":  new Ion("ammonium",  ["sulphate", "chloride", "oxalate", "carbonate"],           1),
        "barium":    new Ion("barium",    ['chloride', 'nitrate'],                                    2),
        "lead":      new Ion("lead",      ["acetate", "chloride", "nitrate"],                         2),
        "magnesium": new Ion("magnesium", ["sulphate", "chloride"],                                   2),
        "strontium": new Ion("strontium", ["chloride"],                                               2),
        "aluminium": new Ion("aluminium", ["nitrate", "sulphate"],                                    3),
        "zinc":      new Ion("zinc",      ["acetate"],                                                2),
        "calcium":   new Ion("calcium",    ["chloride", "sulphate"],                                   2),
    }
}

const symbols = {
    anions: {
        "sulphate":  "SO<sub>4</sub>",
        "chloride":  "Cl",
        "carbonate": "CO<sub>3</sub>",
        "oxalate":   "C<sub>2</sub>O<sub>4</sub>",
        "phosphate": "PO<sub>4</sub>", 
        "nitrate":   "NO<sub>3</sub>",
        "acetate":   "CH<sub>3</sub>COO",
        "calcium":   "Ca",
    },
    cations: {
        "ammonium":  "NH<sub>4</sub>",
        "barium":    "Ba",
        "lead":      "Pb",
        "magnesium": "Mg",
        "strontium": "Sr",
        "calcium":   "Ca",
        "aluminium": "Al",
        "zinc":      "Zn",
    }
    
}