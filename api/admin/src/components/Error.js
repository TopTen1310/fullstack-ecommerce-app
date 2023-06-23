export default function Error({ errMsg }) {
    return (
        <div className="bg-white border-2 border-gray-800 border-solid rounded-lg p-4 w-[30rem] max-w-[100%] mx-auto mt-10 text-red-500 text-center text-2xl capitalize">
            {errMsg}
        </div>
    )
}
