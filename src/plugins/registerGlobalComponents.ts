import Vue from 'vue'
import PostComments from '~/components/posts/post/comments/PostComments.vue'

// Этот компонент зарегестрировал потому что не мог его рекурсивно использовать. Использовал что не получалось так:
// Был post-comments, в нем много post-comment и post-comment мог иметь свои комменты, я их отображал через
// post-comments, то есть была такая иерархия: post-comments -> post-comment -> post-comments. Так выдавало ошибку:
// Unknown custom element: <post-comments> - did you register the component correctly? Я пробывал ОЧЕНЬ много чего и
// потратил много времени, например, менял name (он у меня и так был), по разному импортировал, менял components...
Vue.component('post-comments', PostComments)
