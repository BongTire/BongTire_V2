<template>
  <div class="w-full h-256">
    <QuillEditor
        v-model:content="content"
        :options="options"
        ref="quillEditor"
        @text-change="contentChange"
        @ready="readyEditor"
        contentType="html"
    />
  </div>
</template>

<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { fetchPostData } from '../../api/common'
import {usePostStore} from "../../stores/post.ts";

const store = usePostStore()
const content = ref<string>()
const quillEditor = ref(null)
content.value = store.getContent


async function ImageHandler(this: any) {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files ? input.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        console.log('Uploading file:', file); // 디버깅을 위해 추가

        const response = await fetchPostData('/file-upload/post',{}, formData);
        const responsStatus = await response

        console.log(responsStatus)

        if (responsStatus?.status.code ===  4004) {
          throw new Error(`HTTP error! status: ${response?.status}`);
        }

        const data = responsStatus.data

        const url = data.imageUrl; // 서버로부터 반환된 이미지 URL

        console.log('Uploaded file URL:', url); // 디버깅을 위해 추가

        // 에디터에 이미지 삽입
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, 'image', url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
}

const options = {
  debug: 'info',
  modules: {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
        ['image'],
      ],
      handlers: { image: ImageHandler },
    },
  },
  placeholder: '내용을 입력해주세요',
  theme: 'snow'
}

const readyEditor = (editor) =>{
  console.log('Editor is ready:', editor);
  // 초기화 이후에 추가적인 작업을 여기서 수행할 수 있습니다.
  // 예를 들어, 기존 내용을 설정할 수 있습니다.
  editor.clipboard.dangerouslyPasteHTML(content.value);
}

const contentChange = () =>{
  store.setContent(content.value)
}




</script>

<style>

</style>