export interface AppConfig {name:string; slug:string; accent:string;icon?:string;googleBadge?:boolean; stores:{apple:string|null;google:string|null};}
export const app:AppConfig = {name:'Simple CBT-I',slug:'simple-cbt-i',accent:'#375bd2',googleBadge:true,stores:{apple:null,google:process.env.PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=com.henor.simplecbti'}};
