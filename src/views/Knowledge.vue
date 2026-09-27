<template>
  <div class="knowledge-page">
    <!-- 页头 -->
    <div class="page-header">
      <h2 class="page-title">知识文章</h2>
      <div class="page-actions">
        <el-button type="primary">新增</el-button>
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
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
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
  margin-bottom: 16px;

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
