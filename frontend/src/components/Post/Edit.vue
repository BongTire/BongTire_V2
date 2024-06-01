<template>
  <div class="w-full h-256">
    <QuillEditor
        :options="options"
        ref="quillEditor"
        v-model="content"
    />
  </div>
</template>

<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { fetchPostData } from '../../api/common'

const content = ref('')
const quillEditor = ref(null)

const imageHandler = () => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.click()

  input.onchange = async () => {
    const file = input.files ? input.files[0] : null
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await uploadImage(formData)
      const imageUrl = response.imageUrl

      const range = quillEditor.value?.quill.getSelection(true)
      quillEditor.value?.quill.insertEmbed(range.index, 'image', imageUrl)
    } catch (error) {
      console.error('Image upload failed:', error)
    }
  }
}

async function uploadImage(formData: FormData) {
  const response = await fetchPostData('/upload-image','','',0, formData)
  return response
}


const options = {
  debug: 'info',
  modules: {
    toolbar: [
      ['header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'image',],
    ],
    handlers: {
      image: imageHandler
    }
  },
  placeholder: '내용을 입력해주세요',
  theme: 'snow'
}



</script>

<style>

</style>