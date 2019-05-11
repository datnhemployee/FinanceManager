import { AsyncStorage } from "react-native";
import Codes from "../constant/Codes";


export default class ConstantRepository {
    static get page () {
        return {
            async getMax () {
                let result = {}
                await AsyncStorage.getItem(`maxPage`,(err,res) => {
                    if(err) {
                        result = {
                            code: Codes.Exception,
                            content: `lỗi khi lấy trang mới nhất.`,
                        }
                        return;
                    }
                    if(res){
                        result = {
                            code: Codes.Success,
                            content: res,
                        }
                        return;
                    }
                    result = {
                        code: Codes.Failed,
                    }
                });
                if(result.code === Codes.Failed){
                    await AsyncStorage.setItem(`maxPage`,1,(err)=>{
                        if(err) {
                            result = {
                                code: Codes.Exception,
                                content: `lỗi khi tạo trang mới nhất.`,
                            }
                            return;
                        }
                        result = {
                            code: Codes.Success,
                            content: 1,
                        }
                    })
                }   
                return result;
            },

            async setMax (value) {
                let result = {
                    code: Codes.None,
                }
                await AsyncStorage.removeItem(`maxPage`,(err)=>{
                    if (err){
                        result = {
                            code:Codes.Exception,
                            content: `Không thể xóa trang mới nhất.`,
                        }
                    }
                });
                if(result.code === Codes.Exception){
                    return result;
                }
                await AsyncStorage.setItem(`maxPage`,value,(err)=>{
                    if(err) {
                        result = {
                            code: Codes.Exception,
                            content: `lỗi khi tạo trang mới nhất.`,
                        }
                        return;
                    }
                    result = {
                        code: Codes.Success,
                        content: value,
                    }
                })
                return result;
            },

            async getCurrent () {
                let result = {}
                await AsyncStorage.getItem(`currentPage`,(err,res) => {
                    if(err) {
                        result = {
                            code: Codes.Exception,
                            content: `lỗi khi lấy trang hiện tại.`,
                        }
                        return;
                    }
                    if(res){
                        result = {
                            code: Codes.Success,
                            content: res,
                        }
                        return;
                    }
                    result = {
                        code: Codes.Failed,
                    }
                });
                if(result.code === Codes.Failed){
                    await AsyncStorage.setItem(`currentPage`,1,(err)=>{
                        if(err) {
                            result = {
                                code: Codes.Exception,
                                content: `lỗi khi tạo trang hiện tại.`,
                            }
                            return;
                        }
                        result = {
                            code: Codes.Success,
                            content: 1,
                        }
                    })
                }   
                return result;
            },

            async setMax (value) {
                let result = {
                    code: Codes.None,
                }
                await AsyncStorage.removeItem(`currentPage`,(err)=>{
                    if (err){
                        result = {
                            code:Codes.Exception,
                            content: `Không thể xóa trang hiện tại.`,
                        }
                    }
                });
                if(result.code === Codes.Exception){
                    return result;
                }
                await AsyncStorage.setItem(`currentPage`,value,(err)=>{
                    if(err) {
                        result = {
                            code: Codes.Exception,
                            content: `lỗi khi tạo trang hiện tại.`,
                        }
                        return;
                    }
                    result = {
                        code: Codes.Success,
                        content: value,
                    }
                })
                return result;
            },
        }
    }

    static get wallet () {
        return {
            async get () {
                let result = {}
                await AsyncStorage.getItem(`wallet`,(err,res) => {
                    if(err) {
                        result = {
                            code: Codes.Exception,
                            content: `lỗi khi lấy tiền trong ví.`,
                        }
                        return;
                    }
                    if(res){
                        result = {
                            code: Codes.Success,
                            content: res,
                        }
                        return;
                    }
                    result = {
                        code: Codes.Failed,
                    }
                });
                if(result.code === Codes.Failed){
                    await AsyncStorage.setItem(`wallet`,0,(err)=>{
                        if(err) {
                            result = {
                                code: Codes.Exception,
                                content: `lỗi khi tạo ví.`,
                            }
                            return;
                        }
                        result = {
                            code: Codes.Success,
                            content: 1,
                        }
                    })
                }   
                return result;
            },

            async set (value) {
                let result = {
                    code: Codes.None,
                }
                await AsyncStorage.removeItem(`wallet`,(err)=>{
                    if (err){
                        result = {
                            code:Codes.Exception,
                            content: `Không thể xóa ví.`,
                        }
                    }
                });
                if(result.code === Codes.Exception){
                    return result;
                }
                await AsyncStorage.setItem(`wallet`,value,(err)=>{
                    if(err) {
                        result = {
                            code: Codes.Exception,
                            content: `lỗi khi thêm vào ví.`,
                        }
                        return;
                    }
                    result = {
                        code: Codes.Success,
                        content: value,
                    }
                })
                return result;
            },

        }
    }

}