import React from "react"
import {convertCurrency} from '../../redux/actions/convertCoinsActions'
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {Modal} from "antd";


const TransferData = () => {
    const dataToConvert = useSelector((state) => state.coinConversion);
    const dispatch = useDispatch();
    const { control, handleSubmit, formState:{ errors } } = useForm({
        defaultValues: {
            convertTo: '',
        },
    });
    console.log('Convert Data Ti==>', dataToConvert)
    const currencyName = dataToConvert['currencyName']
    const onSubmit = (data) => {
        dispatch(convertCurrency(dataToConvert['storeCurrencyVal'][0]['symbol'], data['convertTo'], dataToConvert['storeCurrencyVal'][0]['amount']))
        setIsModalOpen(dataToConvert['error'])
    }
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return(
        <>
            {showModal &&
            <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{dataToConvert['errorValue']}, Cors issue is coming POST API</p>
            </Modal>
            }
            <h1 className={'flex justify-center'}>Convert your currency</h1>

            <div className={"flex justify-center"}>
                <input
                    value={dataToConvert['storeCurrencyVal'].length > 0 ? dataToConvert['storeCurrencyVal'][0]['symbol']:"Please select values first from previous page"}
                    disabled={true}
                    type={"text"}
                    className={`px-4 py-3 mt-3 my-1 w-[30%] rounded-md border border-slate-300 focus:outline-none
                            `}
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-column m-[10px] p-[20px] text-center"}>
                <h2 className={"mt-[8px]"}>TO</h2>
                <div>
                    <Controller
                        name="convertTo"
                        control={control}
                        rules={{ required: 'Please select a currency' }}
                        render={({ field }) => (
                            <select
                                className=" px-4 py-3 mt-3 my-1 w-[30%] border border-gray-300 px-2 py-1 rounded-md"
                                {...field}
                            >
                                <option value="">Select a currency</option>
                                {Object.keys(currencyName[0]).map((key) => (
                                    <option key={key} value={key}>
                                        {currencyName[0][key]}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.convertTo && <p className={'text-red-500 text-xs italic'}> {errors.convertTo.message} </p>}

                </div>

                <div className={'mt-3'}>
                    <button
                        type="submit"
                        className={`uppercase w-[12%] text-[white] bg-neutral-500 px-3 py-4 rounded-md bg-textPrimary  text-[14px]  font-[500]    `}
                    >
                        Convert
                    </button>
                </div>
                {!dataToConvert['error'] && <p> { dataToConvert['data']}</p>}
            </form>

        </>

    )
}

export default TransferData;