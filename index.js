'use strict';

/*
Tu strašlivě vypadající funkci níže v komentáři budeš potřebovat později
Funkce zjistí, zda se protínají dva obdélníky. To se hodí například
ve chvíli, kdy chceš zjistit, zda se dotýkají dva objekty na obrazovce,
třeba. ve chvíli, kdy má panáček sebrat minci.

Pokud tě to nezajímá (omg, proč ne?!??), tak buď v klidu. Prostě to jen
ve správnou chvíli použijeme.

Zajímavé je, že tento problém se občas používá u pohovorů v zahraničních
firmách. Neboj, při pohovoru na juniorskou pozici se s ním asi nesetkáš :)

function kolize(a, b) {
	return (!( a.x + a.sirka < b.x
		|| b.x + b.sirka < a.x
		|| a.y + a.vyska < b.y
		|| b.y + b.vyska < a.y));
}
*/


// Vytvoříme objekt pro našeho panáčka
// - panáček má souřadnice x/y, které urují jeho polohu na obrazovce
// - vlastnosti sirka/vyska potřebujeme pro výpočty, zda už je panáček
//   na okraji obrazovky nebo zda se "srazil" s mincí nebo s mouchou
// - do vlastnosti element si uložíme HTML prvek s obrázkem panáčka
//   tj. ten element, se kterým budeme hýbat, když hýbeme s panáčkem
// Stejnou strukturu budou mít i další objekty, které do hry přidáme,
// např. mince nebo nepřítel (moucha, slimák, apod.).
const panacek = {
	x: 50,
	y: 200,
	sirka: 64,
	vyska: 70,
	element: document.querySelector('#panacek')
};

// zavoláme funkci umisti, která nastaví CSS vlastnosti elementu
// panáčka tak, aby se na obrazovce posunul na souřadnice nastavené
// v jeho X a Y
umisti();

// na stránce budeme naslouchat události keydown - stisk klávesy
// pokud uživatel stiskne klávesu, zavolá se funkce posunPanacka
document.addEventListener('keydown', posunPanacka);



// funkce posunPanacka
// - volá se při stisknu klávesy
// - jako parametr e přijímá od JavaScriptu tzv. event object
// - v event objectu jsou uloženy pdrobnosti a nastalé události
// - při stisku klávesy je v objektu např. vlastnost code, která
//   obsahuje kód stisknuté klávesy
// - na kódy jednotlivých kláves se můžeš podívat např. na webu https://keycode.info/
function posunPanacka(e) {

	if (e.code === 'ArrowRight') {

		// při stisku šipky vpravo

		// zvětšíme souřadnici X o nějakou hodnotu
		// (velikost čísla ovlivňuje rychlost panáčka)
		panacek.x += 10;

		// zjistíme, zda pravá strana panáčka (tj. jeho X + SIRKA)
		// už není mimo okno prohlížeče
		// pokud ano, tak souřadnici X nastavíme šířku okna - šířka panáčka
		// tím panáčkovi zabráníme, aby nemohl vyjet z obrazovky ven
		if (panacek.x + panacek.sirka > window.innerWidth) {
			panacek.x = window.innerWidth - panacek.sirka;
		}

		// Do HTML elementu panáčka nastavíme obrázek panáčka koukajícího
		// doprava. To stejné budeme dělat i v ostatních směrech, takže se
		// panáček bude při pohybu otáčet na stranu, kam zrovna jde.
		panacek.element.src = 'images/panacek-vpravo.png';

	} else if (e.code === 'ArrowLeft') {

		// při stisknu šipky vlevo
		// podobné jako při směru vpravu, jen snižujeme X a testujeme,
		// zda panáček nevyjíždí z obrazovky na levé straně (souřadnice X < 0)
		panacek.x -= 10;
		if (panacek.x < 0) {
			panacek.x = 0;
		}
		panacek.element.src = 'images/panacek-vlevo.png';

	} else if (e.code === 'ArrowUp') {

		// při stisku šipky nahoru
		// stejné jako předchozí klávesy, jen měníme souřadnici Y

		panacek.y -= 10;
		if (panacek.y < 0) {
			panacek.y = 0;
		}
		panacek.element.src = 'images/panacek-nahoru.png';

	} else if (e.code === 'ArrowDown') {

		// při stisku šipky dolů

		panacek.y += 10;
		if (panacek.y + panacek.vyska > window.innerHeight) {
			panacek.y = window.innerHeight - panacek.vyska;
		}
		panacek.element.src = 'images/panacek-dolu.png';

	}

	// podle toho, jaká byla stisknuta klávesa, jsme změnili souřadnice
	// panáčka. Nyní zavoláme funkci umisti(), která tyto souřadnice
	// nastaví do CSS vlastností left a top HTML elementu, čimž panáčka
	// na nové souřadnice posune
	umisti();

}



// funkce umisti
// Vezme souřadnice X a Y panáčka a nastaví je do CSS vlastností left a top
// elementu panáčka, čímž ho na dané souřadnice posune na obrazovce.
// CSS vlastnosti left a top musíme nastavovat včetně jednotky, takže za čísla
function umisti() {
	panacek.element.style.left = `${panacek.x}px`;
	panacek.element.style.top = `${panacek.y}px`;
}
