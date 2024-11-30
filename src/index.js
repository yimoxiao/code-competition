document.addEventListener('DOMContentLoaded', function () {
    const functionTabs = document.querySelectorAll('.tab');
    const inputTextarea = document.getElementById('input-textarea');
    const responseArea = document.getElementById('response-area');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // 监听文本输入区域的回车键按下事件
    inputTextarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // 阻止默认的换行行为
            const inputValue = inputTextarea.value;
            if (inputValue.trim() === '') {
                alert('请输入内容后再提交');
                return;
            }
            makeRequest(inputValue, 'general');
        }
    });

    // 为功能分类小栏添加点击事件
    functionTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const functionType = this.getAttribute('data-function');
            const inputValue = inputTextarea.value;
            if (inputValue.trim() === '') {
                alert('请输入内容后再点击对应建议按钮');
                return;
            }
            makeRequest(inputValue, functionType);
        });
    });

    function makeRequest(inputValue, functionType) {
        // 显示加载提示框
        loadingOverlay.style.display = 'flex';
        const data = {
            data: inputValue
        };
        const jsonData = JSON.stringify(data);
        fetch('http://10.189.140.61:18080/get_data', { // 替换为真实后端接口地址
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error('请求失败，状态码：' + response.status);
              }
          })
          .then(data => {
              // 根据不同的功能类型，可进行不同的处理（这里只是简单展示，可按需拓展更复杂逻辑）
              if (functionType === 'health') {
                  handleHealthSuggestion(data.message);
              } else if (functionType === 'diet') {
                  handleDietSuggestion(data.message);
              } else if (functionType === 'exercise') {
                  handleExerciseSuggestion(data.message);
              } else {
                  // 通用情况处理
                  handleGeneralResponse(data.message);
              }
              // 隐藏加载提示框
              loadingOverlay.style.display = 'none';
          })
          .catch(error => {
              console.error(error);
              // 隐藏加载提示框
              loadingOverlay.style.display = 'none';
              responseArea.textContent = '请求失败，请稍后重试';
          });
    }

    function handleHealthSuggestion(suggestion) {
        responseArea.textContent = `健康建议：${suggestion}`;
    }

    function handleDietSuggestion(suggestion) {
        responseArea.textContent = `饮食建议：${suggestion}`;
    }

    function handleExerciseSuggestion(suggestion) {
        responseArea.textContent = `运动建议：${suggestion}`;
    }

    function handleGeneralResponse(response) {
        responseArea.textContent = `通用回复：${response}`;
    }
});