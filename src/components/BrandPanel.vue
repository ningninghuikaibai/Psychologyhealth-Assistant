<template>
  <!-- 左侧品牌区（登录 / 注册页共用） -->
  <div class="brand-panel">
    <div class="brand-content">
      <div class="brand-left">
        <span class="badge">AI 心理助手</span>
        <h1 class="brand-title">云心说</h1>
        <p class="brand-slogan">让情绪被看见，让倾诉有回声。</p>
        <p class="brand-desc">
          把心事说给云听，把情绪慢慢放松。在这里，你不必逞强，也不用急着给自己答案。先被理解，再一点点梳理当下。
        </p>
        <div class="tag-row">
          <span class="tag">24 小时陪伴式倾听</span>
          <span class="tag">情绪记录与轻量疏导</span>
          <span class="tag">更温柔的自我对话空间</span>
        </div>
        <div class="reminder-card">
          <p class="reminder-label">今日提醒</p>
          <p class="reminder-text">允许自己慢一点，也是在认真生活。</p>
        </div>
      </div>

      <div class="brand-right">
        <div class="hero-card">
          <span class="status-pill">云端运行中</span>
          <div class="robot-circle">
            <img class="robot-img" :src="robotImg" alt="云心助手" />
          </div>
          <h2 class="hero-title">像朋友一样陪你梳理心绪</h2>
          <p class="hero-desc">支持倾诉、记录和温柔回应，让表达这件事更轻一点。</p>
        </div>
        <div class="quote-card">
          <p class="quote-label">云心小语</p>
          <p class="quote-text">"先接住情绪，再慢慢和自己说话。"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import robotImg from "@/assets/images/robot-fill.png";
</script>

<style lang="scss" scoped>
.brand-panel {
  flex: 1.4;
  background: linear-gradient(135deg, #f2f9f5 0%, #cfe5d9 55%, #e4f1ea 100%);
  display: flex;
  align-items: center;
  padding: 48px 72px;
}

.brand-content {
  display: flex;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.brand-left {
  flex: 1;
  min-width: 260px;

  .badge {
    display: inline-block;
    padding: 7px 14px;
    background: #fff;
    border: 1px solid #e8f0eb;
    border-radius: 999px;
    font-size: 12px;
    color: #56695f;
    box-shadow: 0 2px 8px rgb(0 0 0 / 4%);
  }

  .brand-title {
    margin: 20px 0 10px;
    font-size: 48px;
    font-weight: 800;
    color: #1c2b24;
    letter-spacing: 4px;
  }

  .brand-slogan {
    margin: 0 0 12px;
    font-size: 20px;
    font-weight: 700;
    color: #233830;
  }

  .brand-desc {
    margin: 0 0 22px;
    max-width: 560px;
    font-size: 14px;
    line-height: 2;
    color: #66796e;
  }
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 26px;

  .tag {
    padding: 9px 16px;
    background: #fff;
    border-radius: 10px;
    font-size: 13px;
    color: #3c4f46;
    box-shadow: 0 2px 6px rgb(0 0 0 / 4%);
  }
}

.reminder-card {
  width: fit-content;
  padding: 16px 22px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgb(0 0 0 / 5%);

  .reminder-label {
    margin: 0 0 6px;
    font-size: 12px;
    color: #8a9a91;
  }

  .reminder-text {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #22332c;
  }
}

.brand-right {
  width: 320px;
  min-width: 264px;
  flex-shrink: 1;
}

.hero-card {
  position: relative;
  padding: 30px 26px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 14px 36px rgb(31 45 39 / 8%);
  text-align: center;

  .status-pill {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 5px 12px;
    background: #0f766e;
    color: #fff;
    border-radius: 999px;
    font-size: 11px;
  }

  .robot-circle {
    width: 116px;
    height: 116px;
    margin: 6px auto 20px;
    border-radius: 50%;
    background: #e7f4f1;
    display: flex;
    align-items: center;
    justify-content: center;

    .robot-img {
      width: 64px;
      height: auto;
    }
  }

  .hero-title {
    margin: 0 0 10px;
    font-size: 18px;
    font-weight: 700;
    color: #22332c;
  }

  .hero-desc {
    margin: 0;
    font-size: 13px;
    line-height: 1.9;
    color: #6b7d74;
  }
}

// 云心小语：位于 hero 卡片下方，与卡片之间留有间隙
.quote-card {
  margin-top: 14px;
  padding: 14px 16px;
  background: #dbebe6;
  border-radius: 10px;
  text-align: left;

  .quote-label {
    margin: 0 0 4px;
    font-size: 12px;
    color: #5f7a6f;
  }

  .quote-text {
    margin: 0;
    font-size: 13px;
    color: #3c4f46;
  }
}
</style>
