$(document).ready(function () {

	ispisNav();
	slikeFuter();
	navFuter();
	navResponsive();

	let location = window.location.pathname;

	console.log(location);

	if (location == '/sajtovi/trips2019/' || location.indexOf("index") != -1 || location == "/trips/") {
		ponuda();
		osoblje();
		citati();
		citatiSlajder()
		$(window).fadeThis();
	}

	if (location.indexOf('about') != -1) {
		osoblje();
		$(window).fadeThis();
	}

	if (location.indexOf('contact') != -1) {
		citati();
		citatiSlajder();
	}

	if (location.indexOf('trips') != -1) {
		ponuda();
		filterPaketa();
		$(window).fadeThis();
	}


	let jelSkrolovano;
	let poslednjiScrollTop = 0;
	let delta = 15;
	let navbarVisina = $('.site-navbar').outerHeight();

	$(window).scroll(function () {
		jelSkrolovano = true;
	});

	setInterval(function () {
		if (jelSkrolovano) {
			pokaziNavBar();
			jelSkrolovano = false;
		}
	}, 250);

	function pokaziNavBar() {
		let st = $(this).scrollTop();

		if (Math.abs(poslednjiScrollTop - st) <= delta) return;

		if (st > poslednjiScrollTop && st > navbarVisina) {
			$('.site-navbar').addClass('navbar-up');
		} else if (st + $(window).height() < $(document).height()) {
			$('.site-navbar').removeClass('navbar-up');
		}

		poslednjiScrollTop = st;
	}

});

let nizMeni = [
	["index.html", "Home"],
	["about.html", "About"],
	["trips.html", "Trips"],
	["contact.html", "Contact"],
	["author.html", 'Author'],
	["docs.pdf", 'Docs']
];

function ispisNav() {
	let mainMenu = document.querySelector(".links");

	for (let i = 0; i < nizMeni.length; i++) {
		let li = document.createElement("li");
		let a = document.createElement('a');
		a.setAttribute('href', nizMeni[i][0]);
		a.classList.add('nav-link');
		a.textContent = nizMeni[i][1];
		li.appendChild(a);

		mainMenu.appendChild(li);
	}

	if (location.pathname == '/') {
		$('.links li a').first().parent().addClass('active');
	} else {
		$('.links li a[href="' + window.location.pathname.substring(1) + '"]').parent().addClass('active');
	}

}

function navResponsive() {
	let burger = document.querySelector(".burger");
	let nav = document.querySelector(".links");
	let links = document.querySelectorAll(".links li");

	burger.addEventListener('click', function () {
		nav.classList.toggle('links-active');
		links.forEach(function (link, index) {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `fade 0.5s ease forwards ${index / 9 + 0.5}s`;
			}
		});
	});

}

let nizPaketa = [
	["$200.00", "Mossy Forest", "adventure"],
	["$390.00", "Zlatibor", "adventure"],
	["$180.00", "Mount Fuji", "adventure"],
	["$600.00", "Bali", "beach"],
	["$330.00", "Hawaii", "beach"],
	["$450", "Mount Everest", "adventure"]
];

let nizPaketaDesc = [
	["The mossy forest is a natural environment that grows only at the highest elevations of Cameron Highlands and other mountain ranges across Malaysia. At such heights, low-level clouds in the sky driven by winds, blanket the forests with constant mist and moisture - creating an ideal biotope for moss, ferns, lichen and orchids.", "This moist tropical evergreen forest is also a rich repository for a varied set of montane creatures, encompassing insects, snakes, frogs, birds and mammals unique to this chilly atmosphere. Visitors can explore the mossy forest through a boardwalk 2km before the peak of Gunung Brinchang, beginning from a clearing along the main road."],
	["Zlatibor is a mountainous region situated in the western part of Serbia.Among the most popular places in Serbia for tourism, Zlatibor's main attractions include health tourism, skiing, and hiking.", "The Zlatibor region is divided among two municipalities, Čajetina and Užice, while both lie within the Zlatibor District. The Belgrade-Bar railroad passes through Zlatibor. The Tornik ski resor is located in the area."],
	["Japan’s Mt. Fuji is an active volcano about 100 kilometers southwest of Tokyo. Commonly called “Fuji-san,” it’s the country’s tallest peak, at 3,776 meters. A pilgrimage site for centuries, it’s considered one of Japan’s 3 sacred mountains", 'The current kanji for Mount Fuji, 富 and 士, mean "wealth" or "abundant" and "a man of status" respectively. However, the name predates kanji, and these characters are ateji.'],
	["There is no other place like Bali in this world. The Island of the Gods offers great beaches, countless waves for surfing and wonderful natural sites to visit and explore, colorful ceremonies, and gifted artists. There is an unbelievably wide range of hotels, resorts and villas, restaurants & bars, spas", "But, Bali is much more than that!. There is a special vibe, an essence, something authentic that is difficult to describe, which has touched and inspired visitors from all over the world since decades. It has something to do with the Balinese themselves and their warm and welcoming character."],
	["Hawaii's diverse natural scenery, warm tropical climate, abundance of public beaches, oceanic surroundings, and active volcanoes make it a popular destination for tourists, surfers, biologists, and volcanologists alike.Hawaii has over a million permanent residents along with many visitors and U.S. military personnel. ", "Hawaii's climate is typical for the tropics, although temperatures and humidity tend to be a bit less extreme due to near-constant trade winds from the east. Summer highs are usually in the upper 80s °F, (around 31 °C) during the day and mid 70s, (around 24 °C) at night. "],
	["Mount Eerest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The international border between Nepal (Province No. 1) and China (Tibet Autonomous Region) runs across its summit point.The current official elevation of 8,848 m (29,029 ft), recognised by China and Nepal, was established by a 1955 Indian survey and subsequently confirmed by a Chinese survey in 1975.", "Mount Everest attracts many climbers, some of them highly experienced mountaineers. There are two main climbing routes, one approaching the summit from the southeast in Nepal (known as the 'standard route') and the other from the north in Tibet. While not posing substantial technical climbing challenges on the standard route, Everest presents dangers such as altitude sickness, weather, and wind,"]
]

function ponuda() {
	let paketi = document.querySelector("#paketi");

	for (let i = 0; i < nizPaketa.length; i++) {
		paketi.innerHTML += `
			<div class="col-lg-4 col-md-6 mb-4" data-desc="${nizPaketa[i][2]}">
				<div class="listing-item" id="item${i}">
					<div class="listing-image">
						<img src="images/img_${i + 1}.jpg" alt="Image Paket ${i}" class="img-fluid" />
					</div>
					<div class="listing-item-content">
						<button class="px-3 mb-3 category bg-primary btn">${nizPaketa[i][0]}</button>
						<h2 class="mb-3">${nizPaketa[i][1]}</h2>
						<input type="button" class="mb-3 btn btn-primary paketVM text-white" value="View More" />
					</div>
				</div>
			</div>
		`;

	}

	let paketiBtn = document.querySelectorAll('.paketVM');
	paketiBtn.forEach(function (element) {
		element.addEventListener('click', prikaziDet);
	});
}

function prikaziDet() {
	let itemId = this.parentElement.parentElement.id;
	let index = itemId.substring(itemId.length - 1);
	// console.log(index);

	let divMain = document.createElement('div');
	divMain.classList.add('div-view-more');
	let divCont = document.createElement('div');
	divCont.classList.add('container', 'vm-container');
	divCont.innerHTML = `
		<div class="modal-header ">
			<h5 class="modal-title sectionTitle" id="exampleModalLabel">${nizPaketa[index][1]}</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-lg-4">
					<img class="img-fluid" src="images/${nizPaketa[index][1]}1.jpg" alt="Location Detail ${index}" />
				</div>
				<div class="col-lg-4">
					<img class="img-fluid" src="images/${nizPaketa[index][1]}2.jpg" alt="Location Detail ${index}" />
				</div>
				<div class="col-lg-4">
					<img class="img-fluid" src="images/${nizPaketa[index][1]}3.jpg" alt="Location Detail ${index}" />
				</div>
			</div>

			<h3 class="mt-3">Location details</h3>

			<div class="row mt-3">
				<div class="col-lg-6 col-sm-12">
					<p>${nizPaketaDesc[index][0]}</p>
				</div>

				<div class="col-lg-6 col-sm-12">
					<p>${nizPaketaDesc[index][1]}</p>
				</div>

			</div>

			<div class="row mt-3 justify-content-center">
				<a class="px-3 mb-3 category bg-primary btn text-white" href="contact.html">Buy</a>
			</div>

		</div>
	`;
	divMain.appendChild(divCont);
	document.body.appendChild(divMain);

	$('.site-navbar').addClass('navbar-up');

	let zatvoriBtn = document.querySelector(".close");
	zatvoriBtn.addEventListener('click', function () {
		document.body.removeChild(divMain);
		$('.site-navbar').remove('navbar-up');
	});


}

function filterPaketa() {
	let btns = $('#filters .btn');

	btns.click(function () {
		let btnId = this.id;
		$("#filters .btn").removeClass("btn-reverse");
		$(this).addClass("btn-reverse");
		$('#paketi > div').each(function () {
			if (btnId == $(this).attr('data-desc')) {
				$(this).fadeIn();
			} else {
				$(this).fadeOut();
			}

			if (btnId == 'all') {
				$(this).fadeIn();
			}
		})
	})
}

function osoblje() {
	let tim = document.querySelector("#tim");
	let niz = [
		["James Baron", "CEO"],
		["Amber Jenkins", "MANAGER"],
		["Claire Dormey", "STAFF"]];

	let out = "";

	for (let i = 0; i < niz.length; i++) {
		out += `
			<div class="col-lg-4 col-md-12 mb-4">
				<div class="person-29191 text-center">
				<img src="images/staff_${i + 1}.jpg" alt="Image" class="img-fluid mb-4" />
				<div class="px-4">
					<h2 class="mb-2">${niz[i][0]}</h2>
					<p class="caption mb-4">${niz[i][1]}</p>
					<div class="social_29128 mt-5">
					<a href="https://www.facebook.com/" target="_blank"><span class="icon-facebook"></span></a>  
					<a href="https://www.instagram.com/" target="_blank"><span class="icon-instagram"></span></a>  
					<a href="https://twitter.com/" target="_blank"><span class="icon-twitter"></span></a>  
				</div>
				</div>
				</div>
			</div>
		`;
	}

	tim.innerHTML = out;
}

let nizCitata = [
	["John Jaden", "Amber, thank you so much for a well organized trip. Hard to believe it's already done and past. Weather was awesome, the hotels were nice, thank you for everything!"],
	["Amaya Welt", "Easily the best experience I have ever had working with a travel agent. Kelly ask the right questions up front. She listened well, planned and made travel arrangements thinking ahead for me."],
	["Emmi Kent", "Claire planned the perfect vacation - the accommodations that she had selected for us were unbelievable! We could have never found these gems if we had tried to plan it ourselves"],
	["Blake Thomas", "Everything was thoroughly laid out, they answered all my questions, they follow-up great, and very detailed oriented. You all are magicians! Thank you for everything you do."],
	["Abby Dean", "Everything went very well. We were happy with all of our accommodations. We really enjoyed our time in Ireland. Everything went smoothly."],
	["Blake Pit", "Claire helped coordinate a trip for 13 people from 5 different states including one last minute change the week prior to departure. She did an amazing job!"]
];

function citati() {
	let citatiSvi = document.querySelectorAll('.testimonial-39191');

	for (let i = 0; i < citatiSvi.length; i++) {
		citatiSvi[i].innerHTML = `
			<div class="mr-4">
				<img src="images/person_${i + 1}.jpg" alt="Image${i}" class="img-fluid" />
			</div>
			<div>
				<blockquote>${nizCitata[i][1]}</blockquote>
				<p>&mdash;${nizCitata[i][0]}</p>
			</div>
		`;
	}

}

function citatiSlajder() {
	let next = document.querySelector(".slideNext");
	let prev = document.querySelector(".slidePrev");
	next.addEventListener('click', function () {
		let current = document.querySelector(".slideItem.active");
		current.classList.remove("active");
		current.classList.add("d-none");

		let nextItem = current.nextElementSibling;

		if (nextItem == null) {
			let first = document.querySelector('.test').firstElementChild;
			first.style.animation = 'fade 1.5s ease';
			first.classList.add("active");
			first.classList.remove('d-none');
		} else {

			nextItem.style.animation = 'fade 1.5s ease';
			nextItem.classList.add("active");
			nextItem.classList.remove('d-none');
		}

	});

	prev.addEventListener('click', function () {

		let current = document.querySelector(".slideItem.active");
		current.classList.remove("active");
		current.classList.add("d-none");

		let prevItem = current.previousElementSibling;

		if (prevItem == null) {
			let last = document.querySelector('.test').lastElementChild;
			last.style.animation = 'fade 1.5s ease';
			last.classList.add("active");
			last.classList.remove('d-none');
		} else {
			prevItem.style.animation = 'fade 1.5s ease';
			prevItem.classList.add("active");
			prevItem.classList.remove('d-none');
		}


	});
}

function slikeFuter() {
	let igSlike = document.querySelector("#igSlike");
	for (let i = 1; i < 7; i++) {
		igSlike.innerHTML += `
			<div class="col-4 gal_col">
				<a href="https://www.instagram.com/"><img src="images/insta_${i}.jpg" alt="Image Insta ${i}" class="img-fluid" /></a>
			</div>
		`;
	}
}

function navFuter() {
	let menuFooter = document.querySelector(".menu-footer");
	for (let i = 0; i < nizMeni.length; i++) {
		menuFooter.innerHTML += `
			<li><a href="${nizMeni[i][0]}">${nizMeni[i][1]}</a></li>
		`;
	}
}

let podaciForme = [];

let submit = $(':button');
submit.click(function () {
	let ime = $('#ime');
	let prezime = $('#prezime');
	let mail = $('#mail');
	let msg = $('#poruka');

	let imePrezimeRe = /^[A-Z][a-z]{2,20}(\s[A-Z][a-z]{2,20})*$/;

	let mailRe = /^\w([\.-]?\w+\d*)*@\w+\.\w{2,6}$/;

	if (ime.val() == '') {
		ime.css({
			'border': '2px solid #dc3545',
		});

		ime.val('')
		ime.attr('placeholder', 'First name can not be empty');

	} else if (!imePrezimeRe.test(ime.val())) {
		ime.css({
			'border': '2px solid #dc3545',
		});

		ime.val("");
		ime.attr("placeholder", "eg. Blake");
	} else {
		ime.css({
			'border': '1px solid #e6e6e6'
		});
		podaciForme.push(ime.val());

		ime.val("");
		ime.attr('placeholder', 'First name');
	}

	if (prezime.val() == '') {
		prezime.css({
			'border': '2px solid #dc3545',
		});

		prezime.val('')
		prezime.attr('placeholder', 'Last name can not be empty');
	} else if (!imePrezimeRe.test(prezime.val())) {
		prezime.css({
			'border': '2px solid #dc3545',
		});

		prezime.val('')
		prezime.attr('placeholder', 'eg. Smith');
	} else {
		prezime.css({
			'border': '1px solid #e6e6e6'
		});
		podaciForme.push(prezime.val());

		prezime.val("");
		prezime.attr('placeholder', 'Last name');
	}

	if (mail.val() == '') {
		mail.css({
			'border': '2px solid #dc3545',
		});

		mail.val('')
		mail.attr('placeholder', 'Email can not be empty');
	} else if (!mailRe.test(mail.val())) {
		mail.css({
			'border': '2px solid #dc3545',
		});

		mail.val('')
		mail.attr('placeholder', 'eg. somebody@example.com');
	} else {
		mail.css({
			'border': '1px solid #e6e6e6'
		});
		podaciForme.push(mail.val());

		mail.val("");
		mail.attr('placeholder', 'Email address');
	}

	if (msg.val() == '' || msg.val() == "Massage can not be empty") {
		msg.css({
			'border': '2px solid #dc3545',
		});

		msg.val('')
		msg.attr('placeholder', 'Message can not be empty');
	} else {
		msg.css({
			'border': '1px solid #e6e6e6'
		});
		podaciForme.push(msg.val());

		msg.val("");
		msg.attr('placeholder', 'Write your message.');
	}


});
