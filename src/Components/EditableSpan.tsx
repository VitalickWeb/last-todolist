import React, {ChangeEvent, useState} from 'react';

export type TitleType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo(({
                                 title,
                                 onChange,
                            }: TitleType) => {
console.log('EditableSpan')
    const [changeTitle, setChangeTitle] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeTitle(e.currentTarget.value)
    }

    const clickAddInput = () => {
        setEditMode(true)
    }

    const blurDelInput = () => {
        setEditMode(false)
        onChange(changeTitle)
    }

    return (
        <>
            {editMode
            ? <input
                value={changeTitle}
                onChange={changeTaskTitleHandler}
                onBlur={blurDelInput}
                autoFocus/>
            : <span onDoubleClick={clickAddInput}>{changeTitle}</span>}
        </>
    );
});

