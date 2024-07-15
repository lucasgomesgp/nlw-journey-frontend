import { ArrowRight, User, XIcon } from "lucide-react";

import { Button } from "../../components/button";
import { FormEvent } from "react";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void;
    createTrip: (event: FormEvent<HTMLFormElement>) => void;
}
export function ConfirmTripModal({
    closeConfirmTripModal, createTrip
}: ConfirmTripModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
                        <button onClick={closeConfirmTripModal}>
                            <XIcon className="size-5" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">
                        Para concluir a criação da viagem para
                        <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span>,
                        nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024 </span>
                        preencha seus dados abaixo:
                    </p>
                </div>
                <form onSubmit={createTrip} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <User className="text-zinc-400 size-5" />
                        <input
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                            type="text"
                            name="name"
                            placeholder="Seu nome completo"
                        />
                    </div>
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <User className="text-zinc-400 size-5" />
                        <input
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                            type="email"
                            name="email"
                            placeholder="Seu e-mail pessoal"
                        />
                    </div>
                    <Button
                        variant="primary"
                        type="submit"
                        size="full"
                    >
                        Confirmar criação da viagem
                        <ArrowRight className="size-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
}