const basePath = "./asset/img/";
const small_circle = document.getElementById("small_circle");
const large_circle = document.getElementById("large_circle");
const price_circle = document.getElementById("price_circle");
const gheImage = document.getElementById("gheImage");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const heading = document.getElementById("heading");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const btnDiscover = document.getElementById("btnDiscover");
const paginationDots = document.querySelectorAll("#pagination i");

const images = [`${basePath}ghe1.png`, `${basePath}ghe2.png`, `${basePath}ghe3.png`];

const headingArray = ['decoration design', 'furniture design', 'tabletop design'];
const titleArray = ['Woodend', 'Ormond', 'Rockland'];
const subtitleArray = ['lithology', 'armchair', 'ceramic'];
const linearGradient = ['linear__gradient1', 'linear__gradient2', 'linear__gradient3'];

let currentIndex = 0;

// Cập nhật trạng thái của pagination dots
function updatePaginationDots() {
    paginationDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    })
}

// Đặt opacity của gheImage = 0 khi trang được tải
function change_content_hero() {
        
    //1. trước tiên mình sẽ làm mờ các đối tượng
    addFadeOut();
    hidePriceCircle();

    setTimeout(() => {
        
        gheImage.src = images[currentIndex];

        // Đợi ảnh mới tải xong, sau đó thực hiện fadeIn
        gheImage.onload = () => {
            //2. loại bỏ fadeOut và áp dụng fadeIn cho gheImage, small_circle,...
            removeFadeOut();
            //3. áp dụng fadeIn cho gheImage và small_circle
            addFadeIn();
            // Áp dụng fadeIn và scale từ 0 đến 1 cho price_circle sau khi gheImage đã tải xong
            showPriceCircle();
            updatePaginationDots(currentIndex);
        };
    }, 1000);

    
    gsap.to([heading, title, subtitle], {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {            
            // Gọi hàm animateText() với nội dung mới
            animateText(heading, headingArray[currentIndex]);
            animateText(title, titleArray[currentIndex]);
            animateText(subtitle, subtitleArray[currentIndex]);

            // Hiệu ứng hiện dần
            gsap.to([heading, title, subtitle], {
                opacity: 1,
                duration: 0.5
            });
        }
    });
}

function animateText(txt, newText) {
    // Xóa SplitType cũ nếu có <-- 2 dòng bên dưới quan trọng
    if (txt.splitType) {
        txt.splitType.revert(); 
    }

    // Cập nhật nội dung mới
    txt.innerHTML = newText;
    txt.splitType = new SplitType(txt, { types: "chars" });

    // Ẩn tất cả ký tự trước khi hiển thị
    gsap.set(txt.splitType.chars, { opacity: 0, y: 10 });

    // Hiển thị từng ký tự với hiệu ứng
    gsap.to(txt.splitType.chars, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out"
    });
}

function hidePriceCircle() {  
    gsap.fromTo(price_circle, {opacity:1, scale:1, duration: 1}, {opacity:0, scale: 0, duration: 0.5, ease: "power2.out"});
}

function showPriceCircle() {
    gsap.fromTo(price_circle, {opacity:0, scale:0, duration: 0.5}, {opacity:1, scale: 1, duration: 0.5, ease: "power2.out"});
}

function removeFadeIn() {
    price_circle.classList.remove('fadeIn');
    gheImage.classList.remove('fadeIn');
    small_circle.classList.remove('fadeIn');
    large_circle.classList.remove('fadeIn');
    large_circle.classList.remove(linearGradient[currentIndex]);
    btnDiscover.classList.remove('fadeIn');
}

function addFadeIn() {
    large_circle.classList.add('fadeIn');
    large_circle.classList.add(linearGradient[currentIndex]);
    price_circle.classList.add('fadeIn');
    gheImage.classList.add('fadeIn');
    small_circle.classList.add('fadeIn');   
    btnDiscover.classList.add('fadeIn');
}

function removeFadeOut() {
    price_circle.classList.remove('fadeOut');
    gheImage.classList.remove('fadeOut');
    small_circle.classList.remove('fadeOut');
    large_circle.classList.remove('fadeOut');
    btnDiscover.classList.remove('fadeOut');
}

function addFadeOut() {
    price_circle.classList.add('fadeOut');
    gheImage.classList.add('fadeOut');
    small_circle.classList.add('fadeOut');
    large_circle.classList.add('fadeOut');    
    btnDiscover.classList.add('fadeOut');
}

function updateLargeCircleBackground() {
    addFadeOut()
}

nextBtn.addEventListener('click', () => {

    //phải remove lớp fadeIn đang hiện diện trong object
    removeFadeIn();
    currentIndex = (currentIndex + 1) % images.length;
    change_content_hero();
});

// Sự kiện click cho nút Prev
prevBtn.addEventListener('click', () => {
    //phải remove lớp fadeIn trước đó    
    removeFadeIn();
   // Lùi về ảnh trước
   currentIndex = (currentIndex - 1 + images.length) % images.length;
   change_content_hero();
});


// console.log(small_circle);
// Ẩn hình ảnh trước, sau đó thay đổi src và hiện lại
// currentIndex = (currentIndex + 1) % images.length;
// gsap.to([gheImage, small_circle], {
//     opacity: 0,
//     duration:2,
//     ease: "power2.out",
//     onComplete: () => {
//         // Cập nhật index và thay đổi src hình ảnh
//         currentIndex = (currentIndex + 1) % images.length;
//         gheImage.src = images[currentIndex];

//         // Đợi đến khi ảnh mới tải xong trước khi áp dụng opacity
//         gheImage.onload = () => {
//             gsap.to([gheImage, small_circle], {
//                 opacity: 1,
//                 duration: 1,
//                 ease: "power2.out"
//             });
//         };
//     }
// });