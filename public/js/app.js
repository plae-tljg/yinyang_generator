// 防抖函数
let debounceTimer;
function debounce(func, wait) {
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), wait);
    };
}

// DOM 元素
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const convertBtn = document.getElementById('convertBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const emojiButtons = document.querySelectorAll('.emoji-btn');

// 转换函数
function convertToYinYang() {
    const text = inputText.value.trim();
    if (!text) {
        outputText.textContent = '请输入一些文字...';
        return;
    }
    
    // 添加加载动画
    convertBtn.classList.add('loading');
    convertBtn.disabled = true;
    
    // 模拟短暂延迟以显示动画（实际转换很快）
    setTimeout(() => {
        // 阴阳怪气转换逻辑
        let result = '';
    
        // 一些常见的阴阳怪气前缀
        const prefixes = [
            '哇~',
            '哎哟~',
            '天呐~',
            '呵呵~',
            '哦~',
            '啧啧~',
            '哎呀~',
            '哟~',
            '嗯哼~',
            '啊这~'
        ];
        
        // 一些常见的阴阳怪气后缀
        const suffixes = [
            '呢~',
            '啦~',
            '哦~',
            '哒~',
            '捏~',
            '哟~',
            '呀~',
            '呗~',
            '嘛~',
            '哈~'
        ];
        
        // 一些阴阳怪气的修饰词
        const modifiers = [
            '可真是太',
            '真的太',
            '简直太',
            '未免也太',
            '实在是',
            '果然是',
            '真的是',
            '确实太',
            '未免太',
            '简直'
        ];
        
        // 表情模板
        const expressions = [
            '（配上绿茶表情）',
            '（翻白眼）',
            '（轻蔑一笑）',
            '（敷衍地鼓掌）',
            '（假笑）',
            '（阴阳怪气）',
            '（呵呵）',
            '（耸肩）'
        ];
        
        // 随机选择修饰元素
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const randomModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
        
        // 转换模板
        const templates = [
            () => `${randomPrefix}${randomModifier}${text}${randomSuffix}${randomExpression}`,
            () => `${randomPrefix}您${randomModifier}${text}${randomSuffix}${randomExpression}`,
            () => `${randomPrefix}这${text}的也${randomModifier}明显了吧${randomSuffix}${randomExpression}`,
            () => `行行行，您说的都${text}${randomSuffix}${randomExpression}`,
            () => `哦~原来${text}啊${randomSuffix}${randomExpression}`,
            () => `${randomPrefix}就这？${text}？${randomSuffix}${randomExpression}`,
            () => `嗯嗯嗯，${text}${randomSuffix}您说得对${randomExpression}`,
            () => `${randomPrefix}${text}？真的吗？我不信${randomSuffix}${randomExpression}`
        ];
        
        // 特殊情况处理（更智能的匹配）
        if (text.includes('厉害') || text.includes('牛逼') || text.includes('强')) {
            result = `哇~您可真是太厉害了呢~（配上绿茶表情）`;
        } else if (text.includes('好') && text.length <= 5) {
            result = `哦~这${text}的也太明显了吧~（翻白眼）`;
        } else if (text.includes('行') || text.includes('可以') || text.includes('OK')) {
            result = `行行行，您说的都${text}~（敷衍地鼓掌）`;
        } else if (text.includes('对') || text.includes('正确')) {
            result = `嗯嗯嗯，您说得对${randomSuffix}（假笑）`;
        } else if (text.includes('谢谢') || text.includes('感谢')) {
            result = `${randomPrefix}不客气呢~应该的应该的${randomSuffix}（假笑）`;
        } else if (text.length <= 2) {
            result = `${randomPrefix}就这？${text}？${randomSuffix}（轻蔑一笑）`;
        } else if (text.includes('？') || text.includes('?')) {
            result = `${randomPrefix}${text}？真的吗？我不信${randomSuffix}${randomExpression}`;
        } else {
            // 随机选择一个模板
            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            result = randomTemplate();
        }
        
        outputText.textContent = result;
        
        // 移除加载动画
        convertBtn.classList.remove('loading');
        convertBtn.disabled = false;
    }, 150);
}

// 复制功能
function copyResult() {
    if (!outputText.textContent || outputText.textContent === '请输入一些文字...') return;
    
    navigator.clipboard.writeText(outputText.textContent).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制！';
        copyBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
        }, 1500);
    }).catch(err => {
        console.error('复制失败:', err);
        // 降级方案：使用传统方法
        const textArea = document.createElement('textarea');
        textArea.value = outputText.textContent;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制！';
            copyBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
            }, 1500);
        } catch (err) {
            alert('复制失败，请手动复制');
        }
        document.body.removeChild(textArea);
    });
}

// 清空功能
function clearAll() {
    inputText.value = '';
    outputText.textContent = '请输入一些文字...';
    inputText.focus();
}

// 初始化函数
function init() {
    // 初始示例
    inputText.value = '你真厉害';
    
    // 添加emoji（改进版：使用正则表达式匹配所有表情）
    emojiButtons.forEach(button => {
        button.addEventListener('click', function() {
            const emoji = this.getAttribute('data-emoji');
            const currentText = outputText.textContent;
            
            // 使用正则表达式匹配所有括号内的内容
            const bracketRegex = /（[^）]+）/g;
            if (bracketRegex.test(currentText)) {
                // 替换所有括号内的内容
                const newText = currentText.replace(bracketRegex, `（配上${emoji}表情）`);
                outputText.textContent = newText;
            } else {
                // 如果没有括号，添加到结尾
                outputText.textContent = currentText + ` ${emoji}`;
            }
        });
    });
    
    // 事件监听
    convertBtn.addEventListener('click', convertToYinYang);
    copyBtn.addEventListener('click', copyResult);
    clearBtn.addEventListener('click', clearAll);
    
    // 键盘快捷键
    inputText.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            convertToYinYang();
        }
    });
    
    // 输入时自动转换（使用防抖）
    const debouncedConvert = debounce(convertToYinYang, 300);
    inputText.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            debouncedConvert();
        } else {
            outputText.textContent = '请输入一些文字...';
        }
    });
    
    // 初始化转换
    convertToYinYang();
}

// 当 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

