/*
========================================================
CONTEXT: DocumentContext
Gerencia o estado dos documentos enviados pelo motorista.

FUNCIONALIDADES:
- Armazena status de cada documento (pending/sent/analyzing/approved/rejected)
- Conta documentos enviados para exibir "X/3 itens"
- Persiste dados temporariamente (pode ser integrado com AsyncStorage depois)
- Compatível com tema Light/Dark

USO:
1. Envolver o app com <DocumentProvider>
2. Usar useDocumentContext() em qualquer tela
========================================================
*/
import React, { createContext, useContext, useState, ReactNode } from "react";

/*
========================================================
TIPOS E INTERFACES
========================================================
*/
export type DocumentStatus =
    | "pending"
    | "sent"
    | "analyzing"
    | "approved"
    | "rejected";

export interface Document {
    id: string;
    title: string;
    status: DocumentStatus;
    imageUri?: string;
    uploadedAt?: string;
}

export interface DocumentContextType {
    documents: Document[];
    updateDocumentStatus: (
        id: string,
        status: DocumentStatus,
        imageUri?: string,
    ) => void;
    getSentCount: () => number;
    resetDocuments: () => void;
}

/*
========================================================
CRIANDO O CONTEXT
========================================================
*/
const DocumentContext = createContext<DocumentContextType | undefined>(
    undefined,
);

/*
========================================================
PROVIDER COMPONENT
Envolve as telas que precisam acessar o estado dos documentos
========================================================
*/
export function DocumentProvider({ children }: { children: ReactNode }) {
    // Estado inicial dos documentos (baseado na lista original)
    const [documents, setDocuments] = useState<Document[]>([
        { id: "crlv", title: "CRLV (documento do veículo)", status: "pending" },
        { id: "cnh", title: "CNH com EAR", status: "pending" },
        { id: "photo", title: "Foto", status: "pending" },
    ]);

    /*
    ================================================
    ATUALIZAR STATUS DE UM DOCUMENTO
    Chamar após upload bem-sucedido
    ================================================
    */
    const updateDocumentStatus = (
        id: string,
        status: DocumentStatus,
        imageUri?: string,
    ) => {
        setDocuments((prev) =>
            prev.map((doc) =>
                doc.id === id
                    ? {
                          ...doc,
                          status,
                          imageUri,
                          uploadedAt: new Date().toISOString(),
                      }
                    : doc,
            ),
        );
    };

    /*
    ================================================
    CONTAR DOCUMENTOS ENVIADOS
    Retorna quantidade com status diferente de 'pending'
    ================================================
    */
    const getSentCount = () => {
        return documents.filter((doc) => doc.status !== "pending").length;
    };

    /*
    ================================================
    RESETAR TODOS OS DOCUMENTOS
    Útil para logout ou reinício de cadastro
    ================================================
    */
    const resetDocuments = () => {
        setDocuments([
            {
                id: "crlv",
                title: "CRLV (documento do veículo)",
                status: "pending",
            },
            { id: "cnh", title: "CNH com EAR", status: "pending" },
            { id: "photo", title: "Foto", status: "pending" },
        ]);
    };

    return (
        <DocumentContext.Provider
            value={{
                documents,
                updateDocumentStatus,
                getSentCount,
                resetDocuments,
            }}
        >
            {children}
        </DocumentContext.Provider>
    );
}

/*
========================================================
HOOK PERSONALIZADO PARA USAR O CONTEXT
Sempre verifique se está dentro do Provider
========================================================
*/
export function useDocumentContext() {
    const context = useContext(DocumentContext);
    if (context === undefined) {
        throw new Error(
            "useDocumentContext must be used within a DocumentProvider",
        );
    }
    return context;
}
