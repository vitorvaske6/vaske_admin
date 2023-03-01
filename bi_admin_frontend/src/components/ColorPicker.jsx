import { useState } from "react";
import { ChromePicker, CustomPicker, PhotoshopPicker } from "react-color";
import { Alpha, EditableInput, Hue, Saturation, Checkboard, } from "react-color/lib/components/common";


const ColorPicker = ({ pickedColorKey, pickedColor, handleLabelsNewColor, handleMouseOut }) => {
    const [state, setState] = useState({
        background: pickedColor,
        displayColorPicker: false,
        color: pickedColor,
    })
    const [openPicker, setOpenPicker] = useState(false)

    const handleChange = (color) => {
        setState({ color: color.hex, background: color.hex });
        //handleLabelsNewColor(pickedColorKey, color)
    };

    const handleChangeComplete = (color) => {
        setState({ color: color.hex, background: color.hex });
        //handleLabelsNewColor(pickedColorKey, color)
    };

    const handleClick = () => {
        //setState({ displayColorPicker: true })
        setOpenPicker(true)
    };

    const handleClose = () => {
        //setState({ displayColorPicker: false })
        setOpenPicker(false)
    };

    const styles = {
        color: {
            width: '25px',
            height: '25px',
            borderRadius: '2px',
            background: `${state.color}`,
        },
        swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
        },
        popover: {
            position: 'absolute',
            zIndex: '2',
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        },
    };

    return (
        <div className=' block w-auto'>
            {/* <ChromePicker color={state.background} onChange={handleChange}></ChromePicker>
            <button
                type='button'
                onClick={handleMouseOut}>Confirmar</button> */}
            <div>
                <div style={styles.swatch} onClick={handleClick}>
                    <div style={styles.color} />
                </div>
                {openPicker && (
                    <PhotoshopPicker onAccept={() => [handleLabelsNewColor(pickedColorKey, state.background), handleClose()] } color={state.background} onChangeComplete={handleChangeComplete} onChange={handleChangeComplete} />
                )}
            </div>
        </div>
    )
}

export default ColorPicker;
