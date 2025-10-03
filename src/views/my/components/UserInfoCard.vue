<script setup lang="ts">
interface UserInfo {
  avatar: string
  nickname: string
  tags: Array<{
    label: string
    icon: string
    type: string
  }>
}

interface Props {
  isLoggedIn: boolean
  userInfo?: UserInfo | null
  guestText: string
}

defineProps<Props>()

defineEmits<{
  userClick: []
  editClick: []
}>()
</script>

<template>
  <div class="user-section" @click="$emit('userClick')">
    <!-- 用户头像 -->
    <div class="user-avatar">
      <div class="avatar-container">
        <div class="avatar-bg">
          <div class="avatar-inner">
            <t-image
              v-if="isLoggedIn && userInfo" :src="userInfo.avatar" :alt="userInfo.nickname" :lazy="true"
              fit="cover" class="avatar-image"
            />
            <t-icon v-else name="user" size="32" color="#0052D9" />
          </div>
        </div>
      </div>
    </div>

    <!-- 用户信息 -->
    <div class="user-info">
      <div class="user-name" :class="{ 'guest-name': !isLoggedIn }">
        {{ isLoggedIn && userInfo ? userInfo.nickname : guestText }}
      </div>

      <!-- 用户标签 -->
      <div v-if="isLoggedIn && userInfo && userInfo.tags.length > 0" class="user-details">
        <div class="user-tags">
          <t-tag v-for="(tag, index) in userInfo.tags" :key="index" size="small" variant="light" class="user-tag">
            <template #icon>
              <t-icon :name="tag.icon" size="12" />
            </template>
            {{ tag.label }}
          </t-tag>
        </div>
      </div>
    </div>

    <!-- 编辑按钮 -->
    <div v-if="isLoggedIn" class="edit-button" @click.stop="$emit('editClick')">
      <t-icon name="edit" size="20" color="var(--td-text-color-primary)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-section {
  padding: 16px 16px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;

  &:active {
    background-color: var(--td-bg-color-container);
  }

  .user-avatar {
    margin-right: 16px;
    flex-shrink: 0;

    .avatar-container {
      width: 64px;
      height: 64px;

      .avatar-bg {
        width: 100%;
        height: 100%;
        background-color: var(--td-bg-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .avatar-inner {
          width: 64px;
          height: 64px;
          background-color: #dbe1fd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;

          .avatar-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .user-name {
      font-size: 16px;
      color: var(--td-text-color-primary);
      font-weight: 600;
      height: 24px;
      line-height: 24px;
      margin-top: 6px;
      white-space: nowrap;

      &.guest-name {
        display: flex;
        align-items: center;
        height: 64px;
        margin-top: 0;
      }
    }

    .user-details {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
      flex-wrap: nowrap;

      .user-tags {
        display: flex;
        gap: 8px;
        flex-wrap: nowrap;
        flex-shrink: 0;

        .user-tag {
          height: 20px;
          font-size: 10px;
          border-radius: 3px;
          padding: 0 6px;
          display: flex;
          align-items: center;
          gap: 2px;
          white-space: nowrap;
        }
      }
    }
  }

  .edit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    &:active {
      background-color: #e0e0e0;
    }
  }
}
</style>
