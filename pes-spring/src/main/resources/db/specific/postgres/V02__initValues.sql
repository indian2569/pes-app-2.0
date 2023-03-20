INSERT INTO pes.roles("name") VALUES('ROLE_USER');
INSERT INTO pes.roles("name") VALUES('ROLE_MODERATOR');
INSERT INTO pes.roles("name") VALUES('ROLE_ADMIN');

INSERT INTO pes.campaigne (id, name, description, active)
VALUES(nextval('campaigne_id_seq'), 'Mapovanie 2014/2015', 'Mapovanie Petržalky a miest kde sa stretáva cieľová skupina ', false);
INSERT INTO pes.campaigne (id, name, description, active)
VALUES(nextval('campaigne_id_seq'), 'Scoot jam ', 'Je súťaž jazdcov na kolobežkách vo voľnom štýle. Vychádza z iniciatívy mladých, ktorí jazdia v Petržalskom skateparku a sú aj tvorcami celej aktivity. Je to špecifické podujatie na ktorom počas dňa, na jednom mieste niekoľko desiatok jazdcov predstaví to najlepšie, čo vedia. ', false);

INSERT INTO pes."event" (id, "name", description, active)
VALUES(nextval('event_id_seq'), 'Scoot jam 2023', ' Preteky kolobežkárov v skateparku.  Dátum udalosti: 03/09/2016 10:00', false);
INSERT INTO pes."event" (id, "name", description, active)
VALUES(nextval('event_id_seq'), 'Nezabudni napísať kod ITMS', ' Popis nebol zadaný.  Dátum udalosti: 13/12/2018 (čas nezadaný)', false);

INSERT INTO pes.coworker (id, "name", description, "position", active) VALUES(nextval('coworker_id_seq'), 'Viliam', 'Developer', 'Dobrovolnik', false);
INSERT INTO pes.coworker (id, "name", description, "position", active) VALUES(nextval('coworker_id_seq'), 'Michal', 'Terén', 'Zamestnanec', false);
INSERT INTO pes.coworker (id, "name", description, "position", active) VALUES(nextval('coworker_id_seq'), 'Marina', 'Klub', 'Zamestnanec', false);

INSERT INTO pes.institution (id, "name", description, active)
VALUES(nextval('institution_id_seq'), 'Asociacia NPDM', 'Mimovládna organizácia, ktorá združuje organizácie realizujúce nízkoprahový program pre deti a mládež na Slovensku. Predmetom činnosti je lobovať v prospech nízkoprahových programov pre deti a mládež a participovať na ich rozvoji. Ciele Asociácie sú a) zastupovať spoločné záujmy členov Asociácie, b) vytvárať, zabezpečovať a udržiavať informovanosť svojich členov, c) koordinovať spoločné aktivity a projekty nízkoprahových programov pre deti a mládež, d) usporadúvať kurzy, školenia, prednášky, semináre a profesijné stretnutia pre členov Asociácie, a širokú verejnosť, e) realizovať vydavateľskú a publikačnú činnosť, f) propagovať a sieťovať nízkoprahové programy pre deti a mládež, g) spolupracovať s organizáciami a orgánmi pôsobiacimi v oblasti svojho pôsobenia.', true);
INSERT INTO pes.institution (id, "name", description, active)
VALUES(nextval('institution_id_seq'), 'Mestská časť Bratislava Petržalka', 'Do pôsobností patrí najmä základné školstvo, správa miestnych komunikácií, stavebné konanie, správa majetku obce, sociálne služby, šport, kultúra, mládež a iné v rámci územia Petržalky. ', true);

INSERT INTO pes."method" (id, "name", description, active)
VALUES(nextval('method_id_seq'), 'Kontakt s komunitou', 'Kontakt s osobou mimo primárnej cieľovej skupiny počas poskytovania služby. Kontakt nejakým spôsobom súvisí s nami poskytovanou službou, resp. sa tejto témy dotkne (napr. rodič, okoloidúci, človek z okolia). ', false);
INSERT INTO pes."method" (id, "name", description, active)
VALUES(nextval('method_id_seq'), 'Krízová intervencia', 'Pracovník poskytuje pomoc pri riešení krízových situácií. Zameriava sa predovšetkým na upokojenie emócií a zvýšenie bezpečia, aby bolo možné prejsť k hľadaniu riešenia, poskytnutiu pomoci. Pri niektorých situáciách pracovník zváži zapojenie iných odborníkov alebo inštitúcií (napr. ÚPSVaR pri týraní dieťaťa, políciu alebo záchranku pri konflikte, zranení, alebo otrave alkoholom).', false);
INSERT INTO pes."method" (id, "name", description, active)
VALUES(nextval('method_id_seq'), 'Nacvik sociálnych a životných zručností ', 'Je špeciálnym prvkom priamej práce, prostredníctvom ktorej má klient možnosť pod vedením pracovníka nacvičiť si rôzne sociálne zručnosti (napr. formy efektívnej komunikácie, riešenie konfliktov, vyjadrovanie potrieb, sebaobslužných činností a pod.). ', false);
INSERT INTO pes."method" (id, "name", description, active)
VALUES(nextval('method_id_seq'), 'Participatívne aktivity', 'Aktivity, do ktorých sa aktívne zapájajú samotní klienti, podľa svojich možností a schopností. V procesoch sú dominantní klienti - plánovač, realizátor a hodnotiteľ. Pracovník je v pozície tútora a kouča. ', false);
INSERT INTO pes."method" (id, "name", description, active)
VALUES(nextval('method_id_seq'), 'Podávanie informácií', 'Môže ísť o sprostredkovanie určitých vedomostí alebo znalostí, ktoré sú pre klienta dôležité z objektívnych alebo subjektívnych dôvodov, alebo sa jedná o informácie, ktoré napomáhajú klientovi zorientovať sa v sociálnej problematike, v oblasti sociálnych služieb a pod., prípadne napomáhajú klientovi pozitívne meniť prostredie, ktoré ho ovplyvňuje. ', false);
INSERT INTO pes."method" (id, "name", description, active)
VALUES(nextval('method_id_seq'), 'Povrzbudenie', 'Vyjadrenie emocionálnej podpory, pochopenia v náročnej situácii, prijatia klienta bez ohľadu na to, čím sa trápi alebo ako to rieši. Pracovník ocení klientovu silu riešiť náročnú situáciu. Prípadne vďaka typu služby ho dokáže dlhodobo podporovať a povzbudzovať aj v jeho drobných úspechoch, ako aj v práci s pocitmi. ', false);
INSERT INTO pes."method" (id, "name", description, active)
VALUES(nextval('method_id_seq'), 'Pozorovanie', 'Plánované, sústavné a zámerné vnímanie v snahe získať hlbšie a všestrannejšie poznatky o vnímaných javoch a osobách v prostredí klienta. Pozoruje sa skupina, ako aj jednotlivec, komunita. Metóda, ktorá je v našej práci jedným zo základných ukazovateľov, akým smerom má postupovať práca s klientom. ', false);
INSERT INTO pes."method" (id, "name", description, active)
VALUES(nextval('method_id_seq'), 'Prevencia drogy', 'Aktivity, ktoré slúžia na zníženie rizika výskytu negatívnych javov alebo na zmiernenie ich následkov v téme drog a ich užívania. Pri prevencii sa využívajú aj ostatné formy práce, napr. poskytovanie informácií, rozhovor, krízová intervencia a pod. ', false);

INSERT INTO pes."program" (id, "name", description, active)
VALUES(nextval('program_id_seq'), 'Nizkoprahový klub', 'Klub KASPIAN na Furdekova 6/a v Petržalke je určený deťom a mladým ľuďom od 7 do 20 rokov vrátane. Využívať jeho ponuku môžu bez poplatkov, registrácií a anonymne. V klube je potrebné dodržiavať len jednoduché pravidlá, aby sa v ňom všetci mohli cítiť dobre a bezpečne. Ponúka voľnočasové a preventívne aktivity, ako aj sociálne služby. ', false);
INSERT INTO pes."program" (id, "name", description, active)
VALUES(nextval('program_id_seq'), 'Nizkoprahový klub senior', 'Klub KASPIAN na Furdekovej 6/a v Petržalke je určený deťom a mladým ľuďom od 13 do 23 rokov vrátane. Využívať jeho ponuku môžu bez poplatkov, registrácií a anonymne. V klube je potrebné dodržiavať len jednoduché pravidlá, aby sa v ňom všetci mohli cítiť dobre a bezpečne. Ponúka voľnočasové a preventívne aktivity, ako aj sociálne služby. ', false);
INSERT INTO pes."program" (id, "name", description, active)
VALUES(nextval('program_id_seq'), 'Online poradenstvo (klub)', 'Poskytovanie služieb tímom pracovníkov nízkoprahového klubu KASPIAN prostredníctvom sociálnej siete. ', false);
INSERT INTO pes."program" (id, "name", description, active)
VALUES(nextval('program_id_seq'), 'Online poradenstvo (terén)', 'Poskytovanie služieb tímom terénnych sociálnych pracovníkov nízkoprahu KASPIAN prostredníctvom sociálnej siete.', false);
INSERT INTO pes."program" (id, "name", description, active)
VALUES(nextval('program_id_seq'), 'Terénna sociálna práca ', 'Ponuka služieb a aktivít na miestach, kde mladí trávia voľný čas je určená deťom a mladým ľuďom vo veku 10 až 23 rokov. Vychádzame za nimi prevažne do skateparku a okolia Markovej ulice. Pomáhame im orientovať sa v nových a hľadať riešenia v ťažkých situáciách. Ponúkame podporu, pomoc a preventívne aktivity. Vytvárame podmienky na uskutočnenie nápadov a spolu s mladými ľuďmi tieto aktivity aj realizujeme. ', false);
