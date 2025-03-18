const basePath = "./asset/img/";
const small_circle = document.getElementById("small_circle");
const gheImage = document.getElementById("gheImage");
const nextBtn = document.getElementById("next");
const heading = document.getElementById("heading");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

const images = [`${basePath}ghe1.png`, `${basePath}ghe2.png`, `${basePath}ghe3.png`];

const headingArray = ['decoration design', 'furniture design', 'tabletop design'];
const titleArray = ['Woodend', 'Ormond', 'Rockland'];
const subtitleArray = ['lithology', 'armchair', 'ceramic'];

let currentIndex = 0;

// Đặt opacity của gheImage = 0 khi trang được tải

function change_content_hero() {
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
    
    gheImage.classList.add("fadeOut");
    small_circle.classList.add("fadeOut");

    // Sau khi fadeOut xong (2 giây), cập nhật ảnh và fadeIn lại
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        gheImage.src = images[currentIndex];

        // Đợi ảnh mới tải xong, sau đó thực hiện fadeIn
        gheImage.onload = () => {
            // Loại bỏ fadeOut và áp dụng fadeIn cho gheImage và small_circle
            gheImage.classList.remove("fadeOut");
            small_circle.classList.remove("fadeOut");

            // Áp dụng fadeIn cho gheImage và small_circle
            gheImage.classList.add("fadeIn");
            small_circle.classList.add("fadeIn");
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
    // Xóa SplitType cũ nếu có
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

nextBtn.addEventListener('click', () => {

    //phải remove lớp fadeIn trước đó
    gheImage.classList.remove('fadeIn');
    small_circle.classList.remove('fadeIn');
    change_content_hero();
});
