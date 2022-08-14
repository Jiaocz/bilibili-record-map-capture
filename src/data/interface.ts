export interface IMapInfo {
    /**
     * 尝试次数
     */
    attempts: number;

    /**
     * 踩
     */
    boos: number;

    /**
     * 通关条件
     */
    clearConditionMagnitude: number;

    /**
     * 通关率
     */
    clearRate: string;

    /**
     * 通关人数
     */
    clears: number;

    /**
     * 图号
     */
    courseId: string;

    /**
     * 难度
     */
    difficulty: number;

    /**
     * 难度 文字
     */
    difficultyName: string;

    /** 
     * 赞
     */
    likes: number;

    /**
     * 投图人
     */
    userName: string;

    /**
     * 过关确认时间
     */
    uploadTimePretty: string;

    /**
     * 最速
     */
    worldRecordPretty: string;

    /**
     * 关卡名
     */
    name: string;
};

export interface IData {
    data: IMapInfo;
    message: string;
    state: number;
};
