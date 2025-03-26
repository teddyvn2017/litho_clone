document.getElementById("mobile-products-toggle").addEventListener("click", () => {
    let submenu = document.getElementById("mobile-submenu");
    let arrow = document.getElementById("mobile-arrow-product");

    // Toggle hiển thị submenu
    submenu.classList.toggle("hidden");

    // Xoay icon mũi tên
    //rotate-180 là class của tailwind
    arrow.classList.toggle("rotate-180");
});


// desktop menu
const productsMenu = document.getElementById("products-menu");
const submenu = document.getElementById("submenu-desktop");
const dropdownIcon = document.getElementById("dropdown-icon");

productsMenu.addEventListener("click", function(e) {
    e.preventDefault(); // Ngừng hành động mặc định của thẻ a
    if (e.target.closest("a")) {
        // Toggle sự hiển thị của menu con
        submenu.classList.toggle("opacity-100");
        submenu.classList.toggle("invisible");

        // Toggle mũi tên xoay
        dropdownIcon.classList.toggle("rotate-180");
    }
});