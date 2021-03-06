<template>
  <v-container fluid fill-height
      v-bind:class="['manage-stories-page', {
        'with-list-left': isListPanelOpen,
      }]">

    <!---------------->
    <!-- List Panel -->
    <!---------------->
    <v-navigation-drawer fixed persistent light enable-resize-watcher
        class="list-panel"
        v-bind:mobileBreakPoint="600"
        v-model="isListPanelOpen">
      <div class="list-panel-controls">
        <div class="control-set">Filters, etc</div>
      </div>
      <admin-content-list
          v-bind:items="storyItems"
          v-bind:displayField="'title'"
          v-bind:itemStyle="'card'"
          v-on:itemClick="loadStoryToQuickView" />
    </v-navigation-drawer>

    <!------------------>
    <!-- Page Content -->
    <!------------------>
    <v-layout justify-center class="page-content">
      <transition name="fade-flash" mode="out-in">

        <!-- Message View (no active item) -->
        <v-flex xs12 class="message-view" key="quickViewOff" v-if="!storyToQuickView">
          <template v-if="hasStories">
            <div class="message-select-to-activate">Select a Story to preview</div>
            <div class="message-or">-or-</div>
          </template>
          <div>
            <a class="message-create-draft"
               v-on:click="startNewStory">+ Start a new Story</a>
          </div>
        </v-flex>

        <!-- Active Item View -->
        <v-flex xs12 sm9 md8 key="quickViewOn" v-else>
          <div>
            <router-link v-bind:to="{ name: 'manage-story', params: { activeStoryID: storyToQuickView.id } }">
              <span>Edit Story</span>
            </router-link>
          </div>
          <br />
          <div>Previewing: {{ storyToQuickView.title }}</div>

          <div class="close-active-item"><a v-on:click="clearStoryToQuickView">(Close)</a></div>
        </v-flex>

      </transition>
    </v-layout>

  </v-container>
</template>

<script>
import AdminContentList from '../components/Admin/AdminContentList.vue';

export default {
  name: 'ManageStoriesPage',

  components: {
    AdminContentList,
  },

  data() {
    return {
      isListPanelOpen: true,
    };
  },

  computed: {
    hasStories() {
      return (this.totalStories > 0);
    },
    storyData() {
      return this.$store.getters.myStories;
    },
    storyItems() {
      return (this.storyData) ? this.storyData.items : null;
    },
    totalStories() {
      return (this.$root.utils.has(this.storyData, 'meta.total_items'))
          ? this.storyData.meta.total_items
          : 0;
    },
    storyToQuickView() {
      return this.$store.getters.itemToPreview;
    },
  },

  beforeMount() {
    this.clearStoryToQuickView(); // clear shared space
    this.$store.dispatch('LOAD_MY_STORIES');
  },

  methods: {
    loadStoryToQuickView(story) {
      if (!this.storyToQuickView) return this.$store.dispatch('SET_ITEM_TO_PREVIEW', story);

      const activeQuickViewID = this.storyToQuickView.id;
      if (story && story.id !== activeQuickViewID) {
        // Clear first, for transition effect...
        return this.clearStoryToQuickView()
          .then(() => {
            setTimeout(() => {
              return this.$store.dispatch('SET_ITEM_TO_PREVIEW', story);
            }, 200);
          });
      }

      return false;
    },
    clearStoryToQuickView() {
      return this.$store.dispatch('CLEAR_ITEM_TO_PREVIEW');
    },
    startNewStory() {
      this.$store.dispatch('CREATE_DRAFT_STORY_TO_EDIT')
        .then((story) => {
          // Navigate to edit page...
          this.$router.push({ name: 'manage-story', params: { activeStoryID: story.id }});
        })
        .catch((error) => {
          console.log('[ManageStoriesPage] error =>', error);
        });
    },
  },
};
</script>

<style scoped>

</style>
