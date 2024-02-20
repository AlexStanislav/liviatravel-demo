<template>
<div></div>
</template>
<script setup>
import { ref } from "vue";
import UploadService from "../services/UploadImage";
const currentImage = ref(undefined);
const previewImage = ref(undefined);

const progress = ref(0);
const message = ref("");

const imageInfos = ref([]);

const selectImage = (event) => {
    currentImage.value = event.target.files[0];
    previewImage.value = URL.createObjectURL(event.target.files[0]);
    progress.value = 0;
    message.value = "";
}

const uploadImage = () => {
    progress.value = 0;

    UploadService.upload(currentImage.value, (event) => {
        progress.value = Math.round((100 * event.loaded) / event.total);
    })
    .then((response) => {
        message.value = response.data.message;
        return UploadService.getFiles();
    })
    .then((images) => {
        imageInfos.value = images.data;
    })
    .catch(() => {
        progress.value = 0;
        message.value = "Could not upload the image!";
        currentImage.value = undefined;
    });

}
</script>
<style lang="scss">

</style>