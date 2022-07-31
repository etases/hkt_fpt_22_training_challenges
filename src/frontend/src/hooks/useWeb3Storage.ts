import { Web3Storage } from "web3.storage";
import { IBase } from "~/types";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ4MDcwOTI0ZmRlMTU5NGQ3NkZENzM1ZEU2RTQzMmQwNzM0NzcyYkQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTkxNjU1MzA2ODgsIm5hbWUiOiJoa3QgZnB0IDIwMjIgc2VtaS1maW5hbCJ9.N1o6sL04lBRECMfGdV_nvcbphIDVGcsdItBXS2IWYGc";

export const web3StorageClient = new Web3Storage({ token });

interface useWeb3StorageProps extends IBase {}

export function useWeb3Storage(props) {}
