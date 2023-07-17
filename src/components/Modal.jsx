import React from "react";

const Modal = ({showModal, setShowModal, transaction}) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" onClick={()=> setShowModal(false)}>
            <div className="relative w-9/12  my-6 mx-4 max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-6">
                    <div className="flex justify-start">
                    <h3 className="text-2xl font-semibold pb-2">{transaction.payer}</h3>
                    </div>
                    <p className="text-sm font-normal pb-2">paid</p>
                    <p className="text-2xl text-green-700 font-bold">&#8377;{transaction.amount}</p>
                    <p className="text-sm font-normal pb-2">for</p>
                    <div className="grid grid-cols-2">
                    {transaction.payee.map(payee =>(
                        <p className="col-span-1">{payee}</p>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;