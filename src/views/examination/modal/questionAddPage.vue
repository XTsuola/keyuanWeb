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
            <a-form-item label="正确答案" name="answer" :rules="[{ required: true, validator: validAnswer }]">
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
            <a-form-item label="正确答案" name="answer" :rules="[{ required: true, message: '请输入答案!' }]">
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
            <a-form-item label="正确答案" name="answer" :rules="[{ required: true, message: '请输入答案!' }]">
                <a-input v-model:value="addData.answer" />
            </a-form-item>
            <a-form-item label="解释说明" name="remark">
                <a-textarea style="height:120px" v-model:value="addData.remark" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import type { AddQuestionType, EditQuestionType } from "@/api/examination"
import { ref } from "vue"
import type { TypeFlag } from "../questionList.vue"
import type { FormInstance } from "ant-design-vue"

export interface API {
    getAddData: () => Promise<false | EditQuestionType>
}

interface Test {
    id?: number
    stem: string
    type: number
    a?: string | undefined
    b?: string | undefined
    c?: string | undefined
    d?: string | undefined
    answer: string
    url: string
    remark: string
}

const prop = defineProps<{
    flag: TypeFlag
    type: number
    obj: AddQuestionType | EditQuestionType
}>()
const addData = ref<Test>({
    stem: "",
    type: prop.type,
    a: "",
    b: "",
    c: "",
    d: "",
    answer: "",
    url: "",
    remark: ""
})
const opt = ref(["消灭星星"])
if (prop.flag === "edit") {
    const data = JSON.parse(JSON.stringify(prop.obj))
    addData.value.id = data.id
    addData.value.stem = data.stem
    addData.value.type = data.type
    if (data.selectArr && data.selectArr[0] !== "") {
        addData.value.a = data.selectArr[0]
        addData.value.b = data.selectArr[1]
        addData.value.c = data.selectArr[2]
        addData.value.d = data.selectArr[3]
    }
    addData.value.answer = data.answer
    addData.value.url = data.url
    addData.value.remark = data.remark
}
const qustionAdd = ref<FormInstance>()

async function getAddData(): Promise<false | AddQuestionType | EditQuestionType> {
    try {
        await qustionAdd.value?.validate()
        const returnData: AddQuestionType | EditQuestionType = {
            id: addData.value.id as number,
            stem: addData.value.stem,
            type: addData.value.type,
            selectArr: [addData.value.a as string, addData.value.b as string, addData.value.c as string, addData.value.d as string],
            answer: addData.value.answer,
            url: addData.value.url,
            remark: addData.value.remark
        }
        return returnData
    } catch (_) {
        return false
    }
}

function validAnswer(_: any, value: any): any {
    return new Promise((resolve, reject) => {
        if (!value) {
            reject(new Error("请输入答案!"))
        } else {
            const list = ["a", "b", "c", "d", "A", "B", "C", "D", 1, 2, 3, 4]
            if (list.findIndex((item: any) => item == value) == -1) {
                reject(new Error("请输入合法的答案!"))
            } else {
                resolve("")
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