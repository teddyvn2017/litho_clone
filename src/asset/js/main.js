const toggleBtn = document.getElementById("menu-toggle");
const barTop = document.getElementById("bar-top");
const barMiddle = document.getElementById("bar-middle");
const barBottom = document.getElementById("bar-bottom");
const menu = document.getElementById("mobile-menu");
let isOpen = false;

toggleBtn.addEventListener("click", () => {

	let tl = gsap.timeline();
	if (!isOpen) {
		// Chuyển thành dấu "X"
		// Chuyển đổi biểu tượng menu trước, sau đó trượt menu vào
		tl.to(barTop, { y:8, rotate: 45, width: "1.25rem", duration: 0.2 })
			.to(barMiddle, { opacity: 0, duration: 0.1 })
			.to(barBottom, { y: -6, rotate: -45, width: "1.25rem", duration: 0.2 })					
			.to(menu, { x: 0, duration: 1.5, ease: "cubic-bezier(.17,.67,.83,.67)"  });// Hiện menu (trượt ngang)
	} else {
		//https://cubic-bezier.com/
		// Ẩn menu (trượt qua phải)
		tl.to(menu, { x: "100%", duration: 1.5, ease: "cubic-bezier(0.83, 0, 0.17, 1)" })
		// Quay về biểu tượng menu
			.to(barTop, { y: 0, rotate: 0, width: "0.75rem", duration: 0.2 })
			.to(barMiddle, { opacity: 1, duration: 0.1 })
			.to(barBottom, { y: 0, rotate: 0, width: "0.75rem", duration: 0.2 });

		
	}
	isOpen = !isOpen;
});

// header
window.addEventListener("scroll", () => {
	var header = document.querySelector("header");
	if (window.scrollY > 50) {
		header.classList.add("bg-white","shadow-md");
		header.classList.remove("bg-transparent");
	} else {
		header.classList.add("bg-transparent");
		header.classList.remove("bg-white","shadow-md");
	}
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
	if (window.scrollY > 200) {
		scrollToTopBtn.classList.remove("hidden");
	} else {
		scrollToTopBtn.classList.add("hidden");
	}
});

scrollToTopBtn.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

