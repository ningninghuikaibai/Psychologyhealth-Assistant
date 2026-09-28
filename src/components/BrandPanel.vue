<template>
  <div class="auth-layout">
    <div class="left-section">
      <div class="left-inner">
        <div class="content">
          <span class="eyebrow">AI 心理助手</span>
          <h1 class="title">云心说</h1>
          <p class="subtitle">让情绪被看见，让倾诉有回声。</p>
          <p class="text">
            把心事说给云听，把情绪慢慢放松。在这里，你不必逞强，也不用急着给自己答案，
            先被理解，再一点点整理当下。
          </p>

          <ul class="feature-list">
            <li v-for="feature in features" :key="feature">
              {{ feature }}
            </li>
          </ul>

          <div class="comfort-card">
            <span class="comfort-label">今日提醒</span>
            <p class="comfort-text">允许自己慢一点，也是在认真生活。</p>
          </div>
        </div>

        <div class="visual-panel">
          <div class="floating-tag">云端倾听中</div>

          <div class="robot-card">
            <div class="robot-ring">
              <el-image :src="iconUrl" class="robot-image"></el-image>
            </div>
            <p class="robot-title">像朋友一样陪你梳理心绪</p>
            <p class="robot-desc">支持倾诉、记录和温柔回应，让表达这件事更轻一点。</p>
          </div>

          <div class="note-card">
            <span class="note-label">云心小语</span>
            <p class="note-text">“先接住情绪，再慢慢和自己说话。”</p>
          </div>
        </div>
      </div>
    </div>

    <div class="right-section">
      <div class="ambient-bubbles" aria-hidden="true">
        <span class="bubble bubble-1"></span>
        <span class="bubble bubble-2"></span>
        <span class="bubble bubble-3"></span>
        <span class="bubble bubble-4"></span>
        <span class="bubble bubble-5"></span>
      </div>

      <div class="panel-shell">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import iconUrl from "@/assets/images/robot-fill.png";

const features: string[] = ["24 小时陪伴式倾听", "情绪记录与轻量疏导", "更温柔的自我对话空间"];
</script>

<style scoped lang="scss">
.auth-layout {
  display: flex;
  min-height: 100vh;
  background: #ffffff;

  .left-section {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
    min-height: 100vh;
    padding: 56px 64px;
    background:
      radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.9) 0, rgba(255, 255, 255, 0) 26%),
      radial-gradient(circle at 80% 18%, rgba(158, 215, 203, 0.6) 0, rgba(158, 215, 203, 0) 28%),
      radial-gradient(circle at 78% 78%, rgba(109, 171, 158, 0.25) 0, rgba(109, 171, 158, 0) 30%),
      linear-gradient(145deg, #eef7f3 0%, #dcefe8 52%, #c6e2d8 100%);

    .left-inner {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      gap: 40px;
      align-items: center;
      width: 100%;
      max-width: 920px;
      margin: 0 auto;
    }

    .content {
      color: #21453f;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      height: 36px;
      padding: 0 16px;
      border: 1px solid rgba(72, 125, 115, 0.18);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.6);
      color: #4b7a71;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.08em;
      box-shadow: 0 12px 30px rgba(93, 133, 125, 0.08);
    }

    .title {
      margin-top: 22px;
      font-size: 58px;
      line-height: 1.08;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: #173a34;
    }

    .subtitle {
      margin-top: 18px;
      font-size: 25px;
      line-height: 1.45;
      font-weight: 600;
      color: #28534b;
    }

    .text {
      max-width: 500px;
      margin-top: 18px;
      font-size: 17px;
      line-height: 1.9;
      color: rgba(33, 69, 63, 0.85);
    }

    .feature-list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 28px;
    }

    .feature-list li {
      padding: 10px 16px;
      border: 1px solid rgba(76, 128, 118, 0.14);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.72);
      color: #35655c;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 10px 22px rgba(71, 117, 109, 0.08);
      backdrop-filter: blur(8px);
    }

    .comfort-card {
      width: min(100%, 420px);
      margin-top: 30px;
      padding: 22px 24px;
      border: 1px solid rgba(255, 255, 255, 0.65);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.62);
      box-shadow: 0 18px 45px rgba(71, 117, 109, 0.12);
      backdrop-filter: blur(12px);
    }

    .comfort-label {
      display: inline-block;
      margin-bottom: 12px;
      color: #4b7a71;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.12em;
    }

    .comfort-text {
      font-size: 20px;
      line-height: 1.7;
      color: #20433d;
      font-weight: 600;
    }

    .visual-panel {
      position: relative;
    }

    .floating-tag {
      position: absolute;
      top: 18px;
      right: 16px;
      z-index: 2;
      padding: 9px 14px;
      border-radius: 999px;
      background: rgba(39, 92, 84, 0.92);
      color: #ffffff;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.04em;
      box-shadow: 0 14px 30px rgba(32, 67, 61, 0.22);
    }

    .robot-card {
      padding: 34px 28px 30px;
      border: 1px solid rgba(255, 255, 255, 0.72);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.58);
      box-shadow: 0 24px 60px rgba(59, 103, 95, 0.16);
      backdrop-filter: blur(16px);
      text-align: center;
    }

    .robot-ring {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 170px;
      height: 170px;
      margin: 22px auto 28px;
      border: 1px solid rgba(93, 145, 135, 0.18);
      border-radius: 50%;
    }

    .robot-image {
      width: 94px;
      height: 94px;
    }

    .robot-title {
      font-size: 22px;
      line-height: 1.5;
      font-weight: 600;
      color: #1b3f38;
    }

    .robot-desc {
      margin-top: 12px;
      font-size: 15px;
      line-height: 1.8;
      color: rgba(32, 67, 61, 0.72);
    }

    .note-card {
      margin-top: 18px;
      padding: 18px 20px;
      border: 1px solid rgba(255, 255, 255, 0.62);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.48);
      box-shadow: 0 16px 38px rgba(72, 115, 108, 0.1);
      backdrop-filter: blur(14px);
    }

    .note-label {
      display: inline-block;
      margin-bottom: 10px;
      color: #4b7a71;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.12em;
    }

    .note-text {
      color: #28534b;
      font-size: 16px;
      line-height: 1.8;
      font-weight: 500;
    }
  }

  .right-section {
    box-sizing: border-box;
    position: relative;
    flex: 1;
    min-height: 100vh;
    overflow: hidden;
    background:
      radial-gradient(circle at 12% 18%, rgba(255, 216, 232, 0.42) 0, rgba(255, 216, 232, 0) 24%),
      radial-gradient(circle at 85% 16%, rgba(168, 215, 255, 0.34) 0, rgba(168, 215, 255, 0) 24%),
      radial-gradient(circle at 78% 82%, rgba(182, 232, 216, 0.42) 0, rgba(182, 232, 216, 0) 28%),
      radial-gradient(circle at 24% 78%, rgba(255, 235, 190, 0.34) 0, rgba(255, 235, 190, 0) 26%),
      linear-gradient(180deg, #fffdfb 0%, #f5f9ff 42%, #eef7f2 100%);
  }

  .panel-shell {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 36px 24px;
  }

  .ambient-bubbles {
    display: none;
  }
}

@media (max-width: 1240px) {
  .auth-layout {
    .left-section {
      padding: 48px 40px;

      .left-inner {
        grid-template-columns: minmax(0, 1fr) 290px;
        gap: 28px;
      }

      .title {
        font-size: 50px;
      }

      .subtitle {
        font-size: 22px;
      }
    }
  }
}

@media (max-width: 960px) {
  .auth-layout {
    flex-direction: column;

    .left-section,
    .right-section {
      min-height: auto;
    }

    .left-section {
      padding: 44px 24px 30px;

      .left-inner {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .content {
        text-align: center;
      }

      .text {
        margin-right: auto;
        margin-left: auto;
      }

      .feature-list {
        justify-content: center;
      }

      .comfort-card {
        margin-right: auto;
        margin-left: auto;
      }

      .visual-panel {
        max-width: 360px;
        margin: 0 auto;
      }

      .floating-tag {
        right: 50%;
        transform: translateX(50%);
      }
    }

    .right-section {
      min-height: auto;
    }

    .panel-shell {
      min-height: auto;
      padding: 24px;
    }
  }
}

@media (max-width: 640px) {
  .auth-layout {
    .left-section {
      padding: 36px 18px 24px;

      .title {
        font-size: 42px;
      }

      .subtitle {
        font-size: 19px;
      }

      .text {
        font-size: 15px;
      }

      .comfort-text {
        font-size: 18px;
      }

      .robot-card {
        padding: 28px 20px 24px;
      }
    }
  }
}
</style>
