// export function imageHandler () {
//     const quill = this.quill;
//
//     const input = document.createElement('input');
//
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();
//
//     input.onchange = async () => {
//         const file = input.files[0];
//         const formData = new FormData();
//
//         formData.append('image', file);
//
//         // Save current cursor state
//         const range = quill.getSelection(true);
//
//         // Insert temporary loading placeholder image
//         quill.insertEmbed(range.index, 'image', 'https://cdn.dribbble.com/users/1341307/screenshots/5377324/morph_dribbble.gif');
//
//         // Move cursor to right side of image (easier to continue typing)
//         quill.setSelection(range.index + 1);
//
//         // THIS NEEDS TO BE HOOKED UP TO AN API
//         // RESPONSE DATA WILL THEN BE USED TO EMBED THE IMAGE
//         // const res = await apiPostNewsImage(formData);
//
//         // Remove placeholder image
//         quill.deleteText(range.index, 1);
//
//         try {
//             console.info('before');
//             const res = await axios({
//                 method: 'POST',
//                 url: 'https://api.imgur.com/3/image',
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 data: formData
//             });
//             console.info('res', res);
//         } catch (err) {
//             console.error('error', err)
//         }
//         // Insert uploaded image
//         quill.insertEmbed(range.index, 'image', 'https://www.gravatar.com/avatar/f3ee4bcc7ffc1da7441cc3c95393b2c1?s=80');
//
//     }
// }