<template>
  <div class="h-full bg-BG_COLOR overflow-hidden">
    <div class="-enter-y w-full h-[60px] box-border fixed z-20 flex px-[20px] justify-between">
      <div class="px-[5px] pt-[10px] cursor-pointer">
        <GLogo is-opacity @click="onGoToIndex" />
      </div>
      <div class="flex">
        <div class="pt-[10px]">
          <SwitchTheme size="large" />
        </div>
        <div class="pt-[10px] pl-[20px]">
          <SwitchLanguage />
        </div>
        <div class="pt-[12px] pl-[20px]">
          <a href="https://github.com/ZhQuella/grow_up_admin" target="_blank">
            <GithubFilled class="w-[30px] h-[30px] text-MAIN_TEXT" />
          </a>
        </div>
      </div>
    </div>
    <div class="flex">
      <div
        class="h-[100vh] w-[400px] bg-BG_COLOR2 flex items-center justify-center overflow-hidden xl:flex sm:hidden"
      >
        <div>
          <div class="px-[10px]">
            <h3 class="text-[30px] pl-[32px] pb-[10px] text-TEXT_LIGHT1 -enter-x">
              {{ $t("LOIN_STATE.STATE_1") }}
            </h3>
            <h3 class="text-[30px] pl-[64px] pb-[10px] text-TEXT_LIGHT1 -enter-x">
              {{ $t("LOIN_STATE.STATE_2") }}
            </h3>
            <h3 class="text-[30px] pl-[98px] text-TEXT_LIGHT1 -enter-x">
              {{ $t("LOIN_STATE.STATE_3") }}
            </h3>
          </div>
          <div class="w-[400px h-[400px] enter-y">
            <img class="block" :src="getImageUrl('login_illustration.png')" />
          </div>
        </div>
      </div>
      <div class="h-[100vh] flex-1 relative">
        <div
          class="xl:w-[450px] md:w-[700px] sm:w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[4px] overflow-hidden border-solid border-[1px] pb-[40px] md:bg-BG_COLOR2 sm:bg-transparent md:border-BORDER_COLOR sm:border-transparent"
        >
          <div class="w-[100px] h-[100px] mx-[auto] my-[30px] -enter-y">
            <img class="block" :src="getImageUrl('logo.png')" />
          </div>
          <div class="px-[40px] relative">
            <!--登录-->
            <!-- enter-active-class="animate__animated animate__fadeInLeft" leave-active-class="animate__animated animate__fadeOutRight" -->
            <div v-if="formType === 'login'">
              <div class="w-full h-[280px]">
                <LoginFrom @forget="onChangeFormType" />
              </div>
              <el-row :gutter="20">
                <el-col :span="12" class="-enter-x">
                  <el-button class="w-full" @click="onChangeFormType('mobilePhone')">
                    {{ $t("LOGIN_WORD.NUMBER_LOGIN") }}
                  </el-button>
                </el-col>
                <el-col :span="12" class="enter-x">
                  <el-button class="w-full" @click="onChangeFormType('qrCodeLogin')">
                    {{ $t("LOGIN_WORD.SCAN_CODE_LOGIN") }}
                  </el-button>
                </el-col>
              </el-row>
            </div>
            <!--忘记密码-->
            <div v-if="formType === 'forgetPassword'">
              <ForgetPassword @back="onChangeFormType" @success="onForgetPasswordSuccess" />
            </div>

            <!--修改密码-->
            <div v-if="formType === 'changePassword'">
              <ChangePassword
                :tag-code="tagCode"
                @back="onChangePasswordBack"
                @success="onChangePasswordSuccess"
              />
            </div>

            <!--手机号登录-->
            <div v-if="formType === 'mobilePhone'">
              <MobilePhone @back="onChangeFormType" />
            </div>

            <!--二维码登录-->
            <div v-if="formType === 'qrCodeLogin'">
              <QrCodeLogin @back="onChangeFormType" />
            </div>

            <div class="pt-[20px] enter-y">
              <el-divider>
                {{ $t("LOGIN_WORD.OTHER_LOGIN_TITLE") }}
              </el-divider>
            </div>
            <div class="mt-[30px] w-[260px] mx-auto">
              <ThirdParty />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GLogo from "components/base/GLogo/index.vue";
import ThirdParty from "components/business/Login/ThirdParty/index.vue";
import LoginFrom from "components/business/Login/Form/index.vue";
import ForgetPassword from "components/business/Login/ForgetPassword/index.vue";
import MobilePhone from "components/business/Login/MobilePhone/index.vue";
import QrCodeLogin from "components/business/Login/QrCodeLogin/index.vue";
import SwitchLanguage from "components/base/SwitchLanguage/index.vue";
import ChangePassword from "components/business/Login/ChangePassword/index.vue";
import SwitchTheme from "components/base/SwitchTheme/index.vue";
import { useEvent } from "./use/useEvent";
import { getImageUrl } from "util/System";

const {
  formType,
  tagCode,
  onGoToIndex,
  onChangeFormType,
  onForgetPasswordSuccess,
  onChangePasswordBack,
  onChangePasswordSuccess
} = useEvent();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LoginPage"
});
</script>
