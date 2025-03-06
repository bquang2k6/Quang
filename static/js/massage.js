class Message {
    /* æ‰¾gptä¸´æ—¶æ‰‹æ“ä¸€ä¸ªæ¶ˆæ¯ç»„ä»¶ zyyo */
    constructor() {
        // æ¶ˆæ¯å®¹å™¨
        this.container = this.createContainer();
    }
    // åˆ›å»ºæ¶ˆæ¯å®¹å™¨
    createContainer() {
        let container = document.getElementById('message-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'message-container';
            container.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
        `;
            document.body.appendChild(container);
        }
        return container;
    }
    // æ˜¾ç¤ºæ¶ˆæ¯
    show({ type = 'info', text = '', duration = 3000 }) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 200px;
        max-width: 400px;
        padding: 10px 15px;
        border-radius: 50px;
        font-size: 18px;
        color: ${this.getTypeStyle(type)};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        opacity: 1;
        animation: slideIn 0.3s ease-in-out;
        border:1px solid var(--border);
        background:var(--card_color);
    
      `;
        messageEl.innerHTML = `
        <span>${text}</span>
        <span class="close-btn" style="margin-left: 10px; cursor: pointer;"></span>
      `;
      // Ă--  

        messageEl.querySelector('.close-btn').onclick = () => this.close(messageEl);
    
        this.container.appendChild(messageEl);
    
        if (duration > 0) {
            setTimeout(() => this.close(messageEl), duration);
        }
    }
   
    getTypeStyle(type) {
        switch (type) {
            case 'success': return ' #28a745;';
            case 'warning': return ' #ffc107;';
            case 'error': return ' #dc3545;';
            default: return ' #007bff;';
        }
    }
  
    close(messageEl) {
        if (messageEl) {
            messageEl.style.opacity = '0';
            setTimeout(() => messageEl.remove(), 300); 
        }
    }
    
    info(text, duration = 3000) {
        this.show({ type: 'info', text, duration });
    }
    success(text, duration = 3000) {
        this.show({ type: 'success', text, duration });
    }
    warning(text, duration = 3000) {
        this.show({ type: 'warning', text, duration });
    }
    error(text, duration = 3000) {
        this.show({ type: 'error', text, duration });
    }
}