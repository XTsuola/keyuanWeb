<template>
    <div v-if="prop.type === 1" class="questionAddBox">
        <a-form ref="qustionAdd" :model="addData" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
            autocomplete="off">
            <a-form-item label="题目名称" name="stem" :rules="[{ required: true, message: '请输入题目名称!' }]">
                <a-textarea v-model:value="addData.stem" />
            </a-form-item>

            <a-form-item label="A" name="a" :rules="[{ required: true, message: '请输入A选项!' }]">
                <a-input v-model:value="addData.a" />
            </a-form-item>

            <a-form-item label="B" name="b" :rules="[{ required: true, message: '请输入B选项!' }]">
                <a-input v-model:value="addData.b" />
            </a-form-item>

            <a-form-item label="C" name="c" :rules="[{ required: true, message: '请输入C选项!' }]">
                <a-input v-model:value="addData.c" />
            </a-form-item>
            <a-form-item label="D" name="d" :rules="[{ required: true, message: '请输入D选项!' }]">
                <a-input v-model:value="addData.d" />
            </a-form-item>
            <a-form-item label="正确答案" name="answer" :rules="[{ required: true, validator: validAnswerType1 }]">
                <a-input v-model:value="addData.answer" />
            </a-form-item>
            <a-form-item label="解释说明" name="remark">
                <a-textarea style="height:120px" v-model:value="addData.remark" />
            </a-form-item>
        </a-form>
    </div>
    <div v-if="prop.type === 2" class="questionAddBox">
        <a-form ref="qustionAdd" :model="addData" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
            autocomplete="off">
            <a-form-item label="题目名称" name="stem" :rules="[{ required: true, message: '请输入题目名称!' }]">
                <a-textarea v-model:value="addData.stem" />
            </a-form-item>
            <a-form-item label="正确答案" name="answer" :rules="[{ required: true, validator: validAnswerType2 }]">
                <a-input v-model:value="addData.answer" />
            </a-form-item>
            <a-form-item label="解释说明" name="remark">
                <a-textarea style="height:120px" v-model:value="addData.remark" />
            </a-form-item>
        </a-form>
    </div>
    <div v-if="prop.type === 3" class="questionAddBox">
        <a-form ref="qustionAdd" :model="addData" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
            autocomplete="off">
            <a-form-item label="题目名称" name="stem" :rules="[{ required: true, message: '请输入题目名称!' }]">
                <a-textarea v-model:value="addData.stem" />
            </a-form-item>
            <a-form-item label="正确答案" name="answer" :rules="[{ required: true, message: '请输入答案!' }]">
                <a-input v-model:value="addData.answer" />
            </a-form-item>
            <a-form-item label="解释说明" name="remark">
                <a-textarea style="height:120px" v-model:value="addData.remark" />
            </a-form-item>
        </a-form>
    </div>
    <div v-if="prop.type === 4" class="questionAddBox">
        <a-form ref="qustionAdd" :model="addData" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
            autocomplete="off">
            <a-form-item label="题目名称" name="stem" :rules="[{ required: true, message: '请输入题目名称!' }]">
                <a-textarea v-model:value="addData.stem" />
            </a-form-item>
            <a-form-item label="正确答案" name="answer" :rules="[{ required: true, message: '请输入答案!' }]">
                <a-input v-model:value="addData.answer" />
            </a-form-item>
            <a-form-item label="解释说明" name="remark">
                <a-textarea style="height:120px" v-model:value="addData.remark" />
            </a-form-item>
        </a-form>
    </div>
    <div v-if="prop.type === 5" class="questionAddBox">
        <a-form ref="qustionAdd" :model="addData" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
            autocomplete="off">
            <a-form-item label="题目名称" name="stem" :rules="[{ required: true, message: '请选择题目名称!' }]">
                <a-select style="width: 100%;" v-model:value="addData.stem">
                    <a-select-option v-for="item in opt" :key="item" :value="item">{{
                        item
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="正确答案" name="answer" :rules="[{ required: true, validator: validAnswerType5 }]">
                <a-input v-model:value="addData.answer" />
            </a-form-item>
            <a-form-item label="解释说明" name="remark">
                <a-textarea style="height:120px" v-model:value="addData.remark" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddType } from "@/utils/global";
import type { AddQuestionType } from "@/api/examination";


const prop = defineProps<{
    flag: AddType
    type: number
    addParams: AddQuestionType
}>()
const qustionAdd = ref<any>();
const addData = ref<AddQuestionType>({
    stem: "",
    type: prop.type,
    a: "",
    b: "",
    c: "",
    d: "",
    answer: "",
    remark: ""
});
const opt = ref(["消灭星星"]);
if (prop.flag === "edit") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}

async function getAddData() {
    try {
        await qustionAdd.value?.validate()
        return addData.value;
    } catch (_) {
        return false;
    }
}

function validAnswerType1(_: any, value: any): any {
    return new Promise((resolve, reject) => {
        if (!value) {
            reject(new Error("请输入答案!"));
        } else {
            const list = ["a", "b", "c", "d", "A", "B", "C", "D", 1, 2, 3, 4];
            if (list.findIndex((item: any) => item == value) == -1) {
                reject(new Error("请输入合法的答案=>['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D', 1, 2, 3, 4]"));
            } else {
                resolve("");
            }
        }
    })
}

function validAnswerType2(_: any, value: any): any {
    return new Promise((resolve, reject) => {
        if (!value) {
            reject(new Error("请输入答案!"));
        } else {
            const list = ["0", "1", "正确", "错误", "对", "错"];
            if (list.findIndex((item: any) => item == value) == -1) {
                reject(new Error("请输入合法的答案=>['0', '1', '正确', '错误', '对', '错']"));
            } else {
                resolve("");
            }
        }
    })
}

function validAnswerType5(_: any, value: any): any {
    return new Promise((resolve, reject) => {
        if (!value) {
            reject(new Error("请输入答案!"))
        } else {
            try {
                const data = JSON.parse(value);
                if (data.length == 5) {
                    for (let i = 0; i < data.length; i++) {
                        if (Number.isNaN(parseFloat(data[i]))) {
                            reject(new Error("请输入合法的答案类型数组=>[x,x,x,x,x]，其中x为浮点型数"));
                            break;
                        }
                    }
                    resolve("");
                } else {
                    reject(new Error("请输入合法的答案类型数组=>[x,x,x,x,x]，其中x为浮点型数"));
                }
            } catch (_) {
                reject(new Error("请输入合法的答案类型数组=>[x,x,x,x,x]，其中x为浮点型数"));
            }
        }
    })
}

defineExpose({
    getAddData
})

</script>

<style lang="less" scoped>
.questionAddBox {
    margin-top: 20px;
}
</style>