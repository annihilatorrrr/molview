/**
 * This file is part of MolView (http://molview.org)
 * Copyright (c) 2014-2023 Herman Bergwerf
 */

var emptyImage = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

var defaultMol2D = [ "C8H10N4O2","APtclcactv04181408232D 0   0.00000     0.00000"," "," 24 25  0  0  0  0  0  0  0  0999 V2000","    2.8660    0.5000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0","    2.0000    1.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0","    2.8660   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0","    2.0000   -1.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0","    3.7321   -1.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0","    3.7321   -2.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0","    4.5981   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0","    5.5443   -0.8047    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0","    6.1279    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0","    5.5443    0.8047    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0","    5.8550    1.7553    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0","    4.5981    0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0","    3.7321    1.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0","    3.7321    2.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0","    2.3100    1.5369    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0","    1.4631    1.3100    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0","    1.6900    0.4631    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0","    3.1121   -2.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0","    3.7321   -2.6200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0","    4.3521   -2.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0","    6.7479   -0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0","    6.4443    1.5626    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0","    6.0476    2.3446    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0","    5.2656    1.9479    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0","  1  2  1  0  0  0  0","  1  3  1  0  0  0  0","  3  4  2  0  0  0  0","  3  5  1  0  0  0  0","  5  6  1  0  0  0  0","  5  7  1  0  0  0  0","  7  8  1  0  0  0  0","  8  9  2  0  0  0  0","  9 10  1  0  0  0  0"," 10 11  1  0  0  0  0"," 10 12  1  0  0  0  0","  7 12  2  0  0  0  0"," 12 13  1  0  0  0  0","  1 13  1  0  0  0  0"," 13 14  2  0  0  0  0","  2 15  1  0  0  0  0","  2 16  1  0  0  0  0","  2 17  1  0  0  0  0","  6 18  1  0  0  0  0","  6 19  1  0  0  0  0","  6 20  1  0  0  0  0","  9 21  1  0  0  0  0"," 11 22  1  0  0  0  0"," 11 23  1  0  0  0  0"," 11 24  1  0  0  0  0","M  END","$$$$" ].join("\n");

var defaultMol3D = ["2519","  -OEChem-10201411173D",""," 24 25  0     0  0  0  0  0  0999 V2000","    0.4700    2.5688    0.0006 O   0  0  0  0  0  0  0  0  0  0  0  0","   -3.1271   -0.4436   -0.0003 O   0  0  0  0  0  0  0  0  0  0  0  0","   -0.9686   -1.3125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0","    2.2182    0.1412   -0.0003 N   0  0  0  0  0  0  0  0  0  0  0  0","   -1.3477    1.0797   -0.0001 N   0  0  0  0  0  0  0  0  0  0  0  0","    1.4119   -1.9372    0.0002 N   0  0  0  0  0  0  0  0  0  0  0  0","    0.8579    0.2592   -0.0008 C   0  0  0  0  0  0  0  0  0  0  0  0","    0.3897   -1.0264   -0.0004 C   0  0  0  0  0  0  0  0  0  0  0  0","    0.0307    1.4220   -0.0006 C   0  0  0  0  0  0  0  0  0  0  0  0","   -1.9061   -0.2495   -0.0004 C   0  0  0  0  0  0  0  0  0  0  0  0","    2.5032   -1.1998    0.0003 C   0  0  0  0  0  0  0  0  0  0  0  0","   -1.4276   -2.6960    0.0008 C   0  0  0  0  0  0  0  0  0  0  0  0","    3.1926    1.2061    0.0003 C   0  0  0  0  0  0  0  0  0  0  0  0","   -2.2969    2.1881    0.0007 C   0  0  0  0  0  0  0  0  0  0  0  0","    3.5163   -1.5787    0.0008 H   0  0  0  0  0  0  0  0  0  0  0  0","   -1.0451   -3.1973   -0.8937 H   0  0  0  0  0  0  0  0  0  0  0  0","   -2.5186   -2.7596    0.0011 H   0  0  0  0  0  0  0  0  0  0  0  0","   -1.0447   -3.1963    0.8957 H   0  0  0  0  0  0  0  0  0  0  0  0","    4.1992    0.7801    0.0002 H   0  0  0  0  0  0  0  0  0  0  0  0","    3.0468    1.8092   -0.8992 H   0  0  0  0  0  0  0  0  0  0  0  0","    3.0466    1.8083    0.9004 H   0  0  0  0  0  0  0  0  0  0  0  0","   -1.8087    3.1651   -0.0003 H   0  0  0  0  0  0  0  0  0  0  0  0","   -2.9322    2.1027    0.8881 H   0  0  0  0  0  0  0  0  0  0  0  0","   -2.9346    2.1021   -0.8849 H   0  0  0  0  0  0  0  0  0  0  0  0","  1  9  2  0  0  0  0","  2 10  2  0  0  0  0","  3  8  1  0  0  0  0","  3 10  1  0  0  0  0","  3 12  1  0  0  0  0","  4  7  1  0  0  0  0","  4 11  1  0  0  0  0","  4 13  1  0  0  0  0","  5  9  1  0  0  0  0","  5 10  1  0  0  0  0","  5 14  1  0  0  0  0","  6  8  1  0  0  0  0","  6 11  2  0  0  0  0","  7  8  2  0  0  0  0","  7  9  1  0  0  0  0"," 11 15  1  0  0  0  0"," 12 16  1  0  0  0  0"," 12 17  1  0  0  0  0"," 12 18  1  0  0  0  0"," 13 19  1  0  0  0  0"," 13 20  1  0  0  0  0"," 13 21  1  0  0  0  0"," 14 22  1  0  0  0  0"," 14 23  1  0  0  0  0"," 14 24  1  0  0  0  0","M  END","> <PUBCHEM_COMPOUND_CID>","2519","","> <PUBCHEM_CONFORMER_RMSD>","0.4","","> <PUBCHEM_CONFORMER_DIVERSEORDER>","1","","> <PUBCHEM_MMFF94_PARTIAL_CHARGES>","15","1 -0.57","10 0.69","11 0.04","12 0.3","13 0.26","14 0.3","15 0.15","2 -0.57","3 -0.42","4 0.05","5 -0.42","6 -0.57","7 -0.24","8 0.29","9 0.71","","> <PUBCHEM_EFFECTIVE_ROTOR_COUNT>","0","","> <PUBCHEM_PHARMACOPHORE_FEATURES>","5","1 1 acceptor","1 2 acceptor","3 4 6 11 cation","5 4 6 7 8 11 rings","6 3 5 7 8 9 10 rings","","> <PUBCHEM_HEAVY_ATOM_COUNT>","14","","> <PUBCHEM_ATOM_DEF_STEREO_COUNT>","0","","> <PUBCHEM_ATOM_UDEF_STEREO_COUNT>","0","","> <PUBCHEM_BOND_DEF_STEREO_COUNT>","0","","> <PUBCHEM_BOND_UDEF_STEREO_COUNT>","0","","> <PUBCHEM_ISOTOPIC_ATOM_COUNT>","0","","> <PUBCHEM_COMPONENT_COUNT>","1","","> <PUBCHEM_CACTVS_TAUTO_COUNT>","1","","> <PUBCHEM_CONFORMER_ID>","000009D700000001","","> <PUBCHEM_MMFF94_ENERGY>","22.901","","> <PUBCHEM_FEATURE_SELFOVERLAP>","25.487","","> <PUBCHEM_SHAPE_FINGERPRINT>","10967382 1 18338799025773621285","11132069 177 18339075025094499008","12524768 44 18342463625094026902","13140716 1 17978511158789908153","16945 1 18338517550775811621","193761 8 15816500986559935910","20588541 1 18339082691204868851","21501502 16 18338796715286957384","22802520 49 18128840606503503494","2334 1 18338516344016692929","23402539 116 18270382932679789735","23552423 10 18262240993325675966","23559900 14 18199193898169584358","241688 4 18266458702623303353","2748010 2 18266180539182415717","5084963 1 17698433339235542986","528886 8 18267580380709240570","53812653 166 18198902694142226312","66348 1 18339079396917369615","","> <PUBCHEM_SHAPE_MULTIPOLES>","256.45","4.01","2.83","0.58","0.71","0.08","0","-0.48","0","-0.81","0","0.01","0","0","","> <PUBCHEM_SHAPE_SELFOVERLAP>","550.88","","> <PUBCHEM_SHAPE_VOLUME>","143.9","","> <PUBCHEM_COORDINATE_TYPE>","2","5","10","","$$$$",""].join("\n");
