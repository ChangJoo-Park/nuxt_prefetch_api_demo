import useSWRV from "swrv"

const fetcher = key => fetch(key).then(resp => resp && resp.json())

export default function () {
  const endpoint = `/api/todos`
  const { data, error } = useSWRV(endpoint, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
  })

  return { data, error }
}
