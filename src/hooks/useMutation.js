import { useMutation } from "@tanstack/react-query"

export const useMutationHooks=(fnCallbank)=>{
    const mutation = useMutation({
    mutationFn:fnCallbank
  })
  return mutation
}