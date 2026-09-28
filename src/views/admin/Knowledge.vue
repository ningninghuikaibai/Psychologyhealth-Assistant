<template>
  <div class="knowledge-page">
    <!-- 页头 -->
    <div class="page-header">
      <h2 class="page-title">知识文章</h2>
      <div class="page-actions">
        <el-button type="primary" @click="openCreateDialog">新增</el-button>
        <el-button type="warning">编辑</el-button>
      </div>
    </div>

    <!-- 搜索栏 -->
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" inline class="search-form">
        <el-form-item label="文章标题">
          <el-input
            v-model="searchForm.title"
            placeholder="请输入文章标题"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="分类">
          <el-select
            v-model="searchForm.categoryId"
            placeholder="请选择分类"
            clearable
            style="width: 200px"
          >
            <el-option label="心理健康基础" value="1" />
            <el-option label="人际关系" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请输入文章内容"
            clearable
            style="width: 200px"
          >
            <el-option label="发布" value="1" />
            <el-option label="下线" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="search-actions">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-card>

    <!-- 文章列表 -->
    <el-card shadow="never" class="table-card">
      <el-table :data="articleList" v-loading="loading" style="width: 100%">
        <el-table-column label="文章标题" min-width="320" show-overflow-tooltip>
          <template #default="{ row }">
            <el-icon class="title-icon"><Collection /></el-icon>
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类" width="180">
          <template #default="{ row }">
            <el-icon class="title-icon"><Collection /></el-icon>
            <span>{{ row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="authorName" label="作者" width="120" />
        <el-table-column prop="readCount" label="阅读量" width="100" />
        <el-table-column prop="publishedAt" label="发布时间" width="200" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row as Article)">编辑</el-button>
            <el-button link type="warning" @click="handleToggleStatus(row as Article)">
              {{ row.status === 1 ? "下线" : "发布" }}
            </el-button>
            <el-button link type="danger" @click="handleDelete(row as Article)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.size"
          :total="pagination.total"
          :page-sizes="[10, 20, 50]"
          layout="prev, pager, next, jumper, total"
          background
          @current-change="fetchList"
          @size-change="fetchList"
        />
      </div>
    </el-card>

    <!-- 新增文章弹窗 -->
    <el-dialog v-model="dialogVisible" title="新增文章" width="950px">
      <el-form ref="formRef" :model="articleForm" :rules="rules" label-width="90px">
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="articleForm.title"
            placeholder="请输入文章标题"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="所属分类" prop="categoryId">
          <el-select v-model="articleForm.categoryId" placeholder="请选择分类" style="width: 100%">
            <el-option label="心理健康基础" value="1" />
            <el-option label="人际关系" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章摘要" prop="summary">
          <el-input
            v-model="articleForm.summary"
            type="textarea"
            :rows="3"
            placeholder="请输入文章摘要(可选)"
            maxlength="1000"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select
            v-model="articleForm.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入文章标签"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload
            class="cover-uploader"
            accept="image/*"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleCoverChange"
          >
            <img v-if="articleForm.cover" :src="articleForm.cover" class="cover-preview" />
            <div v-else class="cover-placeholder">点击上传封面</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容" required>
          <div class="editor-wrapper">
            <Toolbar
              class="editor-toolbar"
              :editor="editorRef"
              :default-config="toolbarConfig"
              mode="default"
            />
            <Editor
              v-model="articleForm.content"
              class="editor-content"
              :default-config="editorConfig"
              mode="default"
              @on-created="handleCreated"
            />
            <div class="editor-footer">
              <span class="char-count">{{ charCount }} / {{ maxContentLength }}</span>
              <div class="editor-progress">
                <div class="editor-progress-inner" :style="{ width: progressPercent + '%' }"></div>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handlePreview">预览效果</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">创建文章</el-button>
      </template>
    </el-dialog>

    <!-- 预览弹窗 -->
    <el-dialog v-model="previewVisible" title="文章预览" width="720px">
      <h2 class="preview-title">{{ articleForm.title || "未命名文章" }}</h2>
      <div v-if="articleForm.content" class="preview-content" v-html="articleForm.content"></div>
      <p v-else class="preview-empty">暂无内容</p>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, shallowRef } from "vue";
import type { FormInstance, UploadFile } from "element-plus";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import type { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import {
  deleteArticle,
  getArticlePage,
  updateArticleStatus,
  type Article,
  type ArticleStatus,
  type PageResult,
} from "@/api/knowledge";

// 搜索表单
const searchForm = reactive({
  title: "",
  categoryId: "",
  status: "",
});

// 分页状态
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});

const articleList = ref<Article[]>([]);
const loading = ref(false);

/** 查询文章列表 */
async function fetchList() {
  loading.value = true;
  try {
    const res = await getArticlePage({
      title: searchForm.title || undefined,
      categoryId: searchForm.categoryId || undefined,
      status: searchForm.status || undefined,
      currentPage: pagination.currentPage,
      size: pagination.size,
    });
    // 兼容 list / records 两种字段名
    const data = res as PageResult<Article> & { records?: Article[] };
    articleList.value = data.list ?? data.records ?? [];
    pagination.total = data.total ?? 0;
  } finally {
    loading.value = false;
  }
}

/** 查询（重置页码到第 1 页） */
function handleSearch() {
  pagination.currentPage = 1;
  fetchList();
}

/** 重置搜索条件 */
function handleReset() {
  searchForm.title = "";
  searchForm.categoryId = "";
  searchForm.status = "";
  pagination.currentPage = 1;
  fetchList();
}

/** 编辑文章 */
function handleEdit(row: Article) {
  ElMessage.info(`编辑文章：${row.title}`);
}

/** 发布 / 下线切换 */
async function handleToggleStatus(row: Article) {
  const target: ArticleStatus = row.status === 1 ? 2 : 1;
  const action = target === 1 ? "发布" : "下线";
  try {
    await ElMessageBox.confirm(`确定要${action}文章「${row.title}」吗？`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
  } catch {
    return;
  }
  await updateArticleStatus(row.id, target);
  ElMessage.success(`${action}成功`);
  fetchList();
}

/** 删除文章 */
async function handleDelete(row: Article) {
  try {
    await ElMessageBox.confirm(`确定要删除文章「${row.title}」吗？`, "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "error",
    });
  } catch {
    return;
  }
  await deleteArticle(row.id);
  ElMessage.success("删除成功");
  fetchList();
}

// ===== 新增文章弹窗 =====
const dialogVisible = ref(false);
const previewVisible = ref(false);
const formRef = ref<FormInstance>();

const articleForm = reactive({
  title: "",
  categoryId: "",
  summary: "",
  tags: [] as string[],
  cover: "",
  content: "",
});

const rules = {
  title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
  categoryId: [{ required: true, message: "请选择分类", trigger: "change" }],
};

/** 打开新增弹窗并重置表单 */
function openCreateDialog() {
  articleForm.title = "";
  articleForm.categoryId = "";
  articleForm.summary = "";
  articleForm.tags = [];
  articleForm.cover = "";
  articleForm.content = "";
  charCount.value = 0;
  dialogVisible.value = true;
}

/** 封面图片选择（仅本地预览） */
function handleCoverChange(file: UploadFile) {
  if (file.raw) {
    articleForm.cover = URL.createObjectURL(file.raw);
  }
}

/** 预览效果 */
function handlePreview() {
  previewVisible.value = true;
}

/** 创建文章（新增接口待后端提供，先做校验占位） */
async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;
  if (!editorRef.value || editorRef.value.getText().trim() === "") {
    ElMessage.error("请输入文章内容");
    return;
  }
  ElMessage.success("文章信息校验通过，创建接口待对接");
}

// ===== 富文本编辑器 =====
const editorRef = shallowRef<IDomEditor | null>(null);
const charCount = ref(0);
const maxContentLength = 5000;
const progressPercent = computed(() => Math.min(100, (charCount.value / maxContentLength) * 100));

const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    "bold",
    "italic",
    "underline",
    "color",
    "bgColor",
    "fontSize",
    "fontFamily",
    "header1",
    "header2",
    "header3",
    "bulletedList",
    "numberedList",
    "blockquote",
    "insertLink",
    "undo",
    "redo",
  ],
};

const editorConfig: Partial<IEditorConfig> = {
  placeholder: "请输入文章内容，支持富文本格式，可以使用加粗、斜体、列表、标题等格式来丰富文章内容",
  maxLength: maxContentLength,
};

function handleCreated(editor: IDomEditor) {
  editorRef.value = editor;
  // 直接监听编辑器 change 事件更新字数（包装组件会覆盖 editorConfig.onChange）
  editor.on("change", () => {
    charCount.value = editor.getText().length;
  });
}

onBeforeUnmount(() => {
  editorRef.value?.destroy();
});

onMounted(fetchList);
</script>

<style lang="scss" scoped>
.knowledge-page {
  padding: 20px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--el-border-color);

  .page-title {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}

.search-card {
  margin-bottom: 16px;

  .search-form {
    :deep(.el-form-item) {
      margin-bottom: 0;
      margin-right: 24px;
    }
  }

  .search-actions {
    margin-top: 4px;
  }
}

// 新增文章弹窗
:deep(.el-dialog) {
  .el-dialog__header {
    margin-right: 0;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
}

.cover-uploader {
  :deep(.el-upload) {
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: var(--el-fill-color);
    }
  }

  .cover-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 100px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
    background-color: var(--el-fill-color-light);
  }

  .cover-preview {
    display: block;
    width: 160px;
    height: 100px;
    object-fit: cover;
  }
}

.editor-wrapper {
  width: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  overflow: hidden;

  .editor-toolbar {
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .editor-content {
    height: 320px;
    overflow-y: hidden;
  }

  .editor-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 12px;
    background-color: var(--el-fill-color-lighter);
    border-top: 1px solid var(--el-border-color-lighter);

    .char-count {
      flex-shrink: 0;
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }

    .editor-progress {
      flex: 0 0 120px;
      height: 4px;
      overflow: hidden;
      background-color: var(--el-border-color);
      border-radius: 2px;

      .editor-progress-inner {
        height: 100%;
        background-color: var(--el-color-primary);
        transition: width 0.2s;
      }
    }
  }
}

// 预览弹窗
.preview-title {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.preview-content {
  max-height: 60vh;
  overflow-y: auto;
  line-height: 1.8;
  color: var(--el-text-color-regular);
}

.preview-empty {
  color: var(--el-text-color-secondary);
}

.table-card {
  .title-icon {
    margin-right: 6px;
    vertical-align: -2px;
    color: var(--el-text-color-secondary);
  }

  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
}
</style>
