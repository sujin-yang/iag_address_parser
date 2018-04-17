var parser = require('../parsers/au.js');
var extend = require('cog/extend');

module.exports = function(input, opts) {
  // parse the base address
  return parser(input, extend({
    street: {
      ACCESS: 'ACCE?SS?',             // ACCESS / ACCS
      ALLEY: 'ALLE?Y',               // ALLEY / ALLY
      //ALLEYWAY: 'AL(LEY)?WA?Y',         // ALLEYWAY / ALWY
      AMBLE: 'AMBLE?',               // AMBLE / AMBL
      APPROACH: 'APP(ROACH)?',          // APPROACH / APP
      ARCADE: 'ARC(ADE)?',            // ARCADE / ARC
      ARTERIAL: 'ARTERIAL',
      AVENUE: 'AV(E|ENUE)?',          // AVENUE / AV / AVE
      //ARTERY: '(ART|ARTERY)',          // ARTERY
      BEACH: '(BCH|BEACH)',
      BEND: 'BEND',
      BOULEVARD: 'B(OUL(EVARD)?|LV(D)?|VARD|VD)',     // BOULEVARD / BLVD
      BOULEVARDE: 'BOULEVARDE',
      BRACE: 'BR(CE|ACE)',
      BRAE: 'BRAE',
      BREAK: '(BRK|BREAK)',
      BRIDGE: '(BDGE|BRIDGE)',
      BROADWAY: '(BDWY|BROADWAY)',
      BROW: 'BROW',                 // BROW
      BYPASS: 'BYPA(SS)?',            // BYPASS / BYPA
      BYWAY: 'BY(WAY|WY)',
      CAUSEWAY: 'CAUS(EWAY)?',          // CAUSEWAY / CWAY
      CENTRE: 'C(TR|ENTRE)',
      CENTREWAY: 'C(NWY|ENTREWAY)',
      CHASE: 'CH(ASE)?',
      CIRCLE: 'CIR(CLE)?',
      CIRCLET: '(CIRCLET|CLT)',
      CIRCUIT: '(CIRCUIT|CCT|CRCT)',        // CIRCUIT / CCT
      CIRCUS: 'CIRC(US)?',            // CIRCUS / CIRC
      CLOSE: 'CL(OS|OSE|S|SE)?',             // CLOSE / CL
      COLONNADE: '(CLDE|COLONNADE)',
      COMMON: '(COMMON|CMMN)',
      COPSE: '(CPS|COPSE)',               // COPSE / CPSE
      CORNER: '(CORNER|CNR)',         // CORNER / CNR
      CORSO:  '(CORSO|CSO)',
      COURT: '(C((OUR)|R)?T|CRT)',   // COURT / CT /CRT
      COVE: 'COVE',
      CRESCENT: 'CR(S|ES|ESCENT)?',          // CRESCENT / CRES
      CREST: 'CR(ST|EST)',
      CROSSING: 'CR(SG|SS|OSS|OSSING)',
      DRIVE: 'D(R|RV|VE|RIVE)',             // DRIVE / DR
      DRIVEWAY: 'DR(WY|IVEWAY)',
      EDGE:'EDGE',
      ELBOW: 'ELBOW',
      ENTRANCE: 'ENT(RANCE)?',
      ESPLANADE: 'ESP(L|LANADE)?',        // ESPLANADE / ESP
      ESTATE: 'EST(ATE)?',
      FAIRWAY: 'FA(WY|IRWAY)',           // FAIRWAY / FAWY
      FIRETRAIL:'(FITR|FIRETRAIL)',
      FLAT: 'FLAT',                        //FLAT
      FREEWAY: 'FR(WY|EEWAY)',           // FREEWAY / FWAY
      KINGSWAY: 'KINGSWAY',
      FRONT: '(FRNT|FRONT)',
      FRONTAGE: '(FRONTAGE|FRTG)',      // FRONTAGE / FRNT
      GARDEN: '(GDN|GARDEN)',
      GARDENS: '(GDNS|GARDENS)',
      GATE: '(GATE|GTE)',
      GLADE: '(GLADE|GLD)',          // GLADE / GLD
      GLEN: 'GLEN',
      GRANGE: 'GRA(NGE)?',
      GREEN: 'GR(EE)?N',             // GREEN / GRN
      GROVE: '(GR|GROVE|GRV|GV|GVE)',          // GLADE / GLD
      GULLY: 'G(UL)?LY',
      HEIGHTS: '(HTS|HEIGHTS)',
      HIGHWAY: 'H(W|Y|WY|IWY|WAY|IGH|IWAY|IGHW|IGHWAY)',        // HIGHWAY / HWY
      HILL: 'HILL',
      LANE: 'L(A|ANE|N|NE)',      // LANE / LN
      LANEWAY: '(LNWY|LANEWAY)',
      LINE: 'LINE',
      LINK: 'LINK',                 // LINK
      LOOKOUT: '(LKT|LOOKOUT)',
      LOOP: 'LOOP',                 // LOOP
      MALL: 'MALL',                 // MALL
      MEW: '(MW|MEWS)',                 // MEWS
      MEWS: '(MWS|MEWS)',                 // MEWS
      NOOK: 'NOOK',
      OUTLOOK: '(OTLK|OUT(LOOK)?)',
      PACKET: '(PACKET|PCKT)',        // PACKET / PCKT
      PARADE: '(PAR(ADE)?|PD(E)?)',            // PARADE / PDE
      PARKWAY: '(PARKWAY|PKWY)',       // PARKWAY / PKWY
      PARK: 'PARK',
      PART: 'PART',
      PASS: 'PASS',
      PATH: 'PATH',
      PATHWAY: '(PATHWAY|P(H)?WY)',
      PLACE: '(PL(ACE)?|PLC)',             // PLACE / PL
      PLAZA: 'PL(A)?ZA',             // PLACE / PL
      POCKET: '(POCKET|PKT)',
      POINT: '(POINT|PNT)',
      PROMENADE: 'PR(O)?M(ENADE)?',         // PROMENADE / PROM
      QUADRANT: '(QD(T)?|Q(UA)?DR(AN)?T)',       // QUADRANT / QDRT
      QUAD: 'QUAD',                 // QUAD
      QUAY: 'Q(UA)?Y',
      QUAYS: 'Q(UA)?YS',             // QUAYS / QYS
      RAMP: 'RAMP',
      RANGE: 'R(A)?NGE',
      REACH: 'R(EA)?CH',
      RESERVE: 'RES(ERVE)?',           // RESERVE / RES
      REST: 'REST',
      RETREAT: '(RTT|RETREAT)',
      RIDGE: 'R(I)?DGE',
      RISE: 'RISE',                 // RISE
      RING: 'RING',
      RIVER: '(RVR|RIVER)',
      ROAD: 'R(O|D|AD|OD|OAD)',              // ROAD / RD
      ROADS: '(RDS|ROADS)',
      ROADWAY: 'ROADWAY',
      ROUND: '(RND|ROUND)',
      ROUTE: '(RT(E)?|ROUTE)',
      ROW: 'ROW',                  // ROW
      RUN: 'RUN',
      SQUARE: 'SQ(UARE)?',            // SQUARE / SQ
      STEPS: 'ST(E)PS',
      STREET: 'ST(R|T|RT|REET)?',            // STREET / ST
      STRIP: 'STR(I)?P',               // STRIP / STRP
      STRAND: 'STRA(ND)?',               // STRIP / STRP
      SUBWAY: '(SBWY|SUBWAY)',
      TARN: 'TARN',                 // TARN
      TERRACE: 'T(C(E)?|ER(C)?|ERCE|RCE|ERR(ACE))',           // TERRACE / TCE
      THOROUGHFARE: '(THOR(OUGHFARE)?|TFARE)',  // THOROUGHFARE / THFR
      TOR: 'TOR',
      TRACK: 'TR(AC)?K',               // TRACK / TRAC
      TRAIL: 'TR(AI)?L',             // TRAIL / TRL
      TRUNKWAY: 'T(RUNK)?WAY',          // TRUNKWAY / TWAY
      TURN: 'TURN',
      VALE: 'VA(LE)?',
      VIEW: 'VIEW',
      VISTA: 'V(I)?STA',               // VISTA / VSTA
      WADE: 'WADE',
      WALK: 'W(((A)?L)?K)',                 // WALK
      WAY: 'WAY',                 // WAY / WY
      WHARF: 'WH(A)RF',
      WALKWAY: 'W(ALK)?WAY',           // WALKWAY / WWAY
      WYND: 'WYND',
      YARD: 'YARD'                  // YARD

    },
    state: {
      ACT: /(^australian\scapital\sterritory|^ACT(\,)?$)/i,
      NSW: /(^new\ssouth\swales|^NSW?(\,)?$)/i,
      QLD: /(^queensland|^QLD(\,)?$)/i,
      SA: /(^south\saustralia|^SA(\,)?$)/i,
      TAS: /(^tasmania|^TAS(\,)?$)/i,
      VIC: /(^victoria|^VIC(\,)?$)/i,
      WA: /(^western\saustralia|^WA(\,)?$)/i,
      NT: /(^northern\sterritory|^NT(\,)?$)/i
    },
  	country: {
        AUS: /^AUSTRALIA|^A\.?U\.?S?$/i
    },
    rePostalCode: /((?:[1-8][0-9]|9[0-7]|0?[28]|0?9(?=09))(?:[0-9]{2}))(\s|\,)*$/ }, opts));
               // Postal codes of the form 'DDDD', with the first
               // two digits 02, 08 or 20-97. Leading 0 may be omitted.
               // 909 and 0909 are valid as well - but no other postal
               // codes starting with 9 or 09.
};
