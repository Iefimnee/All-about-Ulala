/* ========================================
   Product Detail Page JavaScript
   Recipe of Ulala
   ======================================== */

// ========== 成分详情展开/折叠 ==========
function toggleIngredient(ingredientId) {
    const detail = document.getElementById('detail-' + ingredientId);
    const button = event.currentTarget.querySelector('.ingredient-toggle');
    
    if (detail.style.display === 'none' || detail.style.display === '') {
        detail.style.display = 'block';
        button.classList.add('active');
        button.querySelector('.toggle-text').textContent = '閉じる';
    } else {
        detail.style.display = 'none';
        button.classList.remove('active');
        button.querySelector('.toggle-text').textContent = '詳しく';
    }
}

// ========== 完整原材料表展开/折叠 ==========
function toggleFullIngredients() {
    const content = document.getElementById('fullIngredientsContent');
    const button = event.currentTarget;
    const icon = button.querySelector('.toggle-icon');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        button.setAttribute('aria-expanded', 'true');
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
        icon.textContent = '▼';
    }
}

// ========== 复制原材料文本 ==========
async function copyIngredients() {
    const text = document.getElementById('ingredientsText').textContent;
    const button = event.currentTarget;
    const originalText = button.querySelector('.copy-text').textContent;
    
    try {
        await navigator.clipboard.writeText(text.trim());
        
        // 显示成功反馈
        button.classList.add('copied');
        button.querySelector('.copy-text').textContent = 'コピーしました!';
        button.querySelector('.copy-icon').textContent = '✅';
        
        // 2秒后恢复原状
        setTimeout(() => {
            button.classList.remove('copied');
            button.querySelector('.copy-text').textContent = originalText;
            button.querySelector('.copy-icon').textContent = '📋';
        }, 2000);
    } catch (err) {
        console.error('コピーに失敗しました:', err);
        alert('コピーに失敗しました。手動でコピーしてください。');
    }
}

// ========== FAQ展开/折叠 ==========
function toggleFAQ(faqNumber) {
    const answer = document.getElementById('faq-answer-' + faqNumber);
    const button = event.currentTarget;
    const icon = document.getElementById('faq-icon-' + faqNumber);
    
    if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
        button.setAttribute('aria-expanded', 'true');
        icon.textContent = '▲';
    } else {
        answer.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
        icon.textContent = '▼';
    }
}

// ========== 平滑滚动到锚点 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 处理页面内锚点链接
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========== 图片懒加载优化 ==========
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // 触发加载
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// ========== 返回顶部功能（可选） ==========
let scrollToTopButton;

document.addEventListener('DOMContentLoaded', function() {
    // 创建返回顶部按钮（如果需要）
    scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.display = 'none';
    scrollToTopButton.setAttribute('aria-label', 'ページトップへ戻る');
    document.body.appendChild(scrollToTopButton);
    
    // 监听滚动
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });
    
    // 点击返回顶部
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ========== 打印友好功能（可选） ==========
function printPage() {
    window.print();
}

// ========== 分享功能（可选） ==========
function shareProduct() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        }).then(() => {
            console.log('共有成功');
        }).catch((error) => {
            console.log('共有キャンセル', error);
        });
    } else {
        // フォールバック: URLをコピー
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('URLをコピーしました！');
        });
    }
}

// ========== 外部链接新窗口打开 ==========
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// ========== 键盘导航增强 ==========
document.addEventListener('DOMContentLoaded', function() {
    // FAQ键盘导航
    const faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // 成分详情键盘导航
    const ingredientHeaders = document.querySelectorAll('.ingredient-header');
    ingredientHeaders.forEach(header => {
        header.setAttribute('tabindex', '0');
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// ========== 性能监控（开发用） ==========
if (typeof console !== 'undefined') {
    window.addEventListener('load', function() {
        // 页面加载完成后的性能统计
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('ページ読み込み時間:', pageLoadTime + 'ms');
    });
}
