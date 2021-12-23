<style scoped>
.avatar {
  position: relative;
}

.circle-shadow {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  float: left;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  left: 50%;
  margin-left: -150px;
}

.circle-shadow h3 {
  margin: 0 auto;
  margin-top: 70%;
  padding: 0;
  color: white;
}

.avatar-float-button {
  display: none;
}

.avatar:hover .avatar-float-button {
  display: block;
}
</style>

<template>
  <div class="avatar">
    <img
      alt=""
      class="circle responsive-img"
      src="https://sun9-11.userapi.com/impf/c638426/v638426062/50419/eNL3yaz6niM.jpg?size=300x300&quality=96&proxy=1&sign=281eca8b1027b3a552a1e591fd6d5019&type=audio"
    />
    <!--    <div class="circle-shadow avatar-float-button" v-on:click="onClickChange">-->
    <!--      <h3>Нажмите</h3>-->
    <!--    </div>-->
    <!--    <div class="circle-shadow" v-bind:class="{active:isLoading}">-->
    <!--      <h5></h5>-->
    <!--    </div>-->
    <!--    <input ref="fileInput" class="avatar-input" type="file" hidden v-on:change="onChangeAvatar"/>-->
  </div>
</template>

<script>
export default {
  name: 'AvatarImage',
  // data: function () {
  //   return {
  //     isLoading: false,
  //   };
  // },
  methods: {
    onClickChange: function () {
      // this.$refs.fileInput.click();
    },
    onChangeAvatar: function (file) {
      // console.log(file);
    },
  },
};
</script>
