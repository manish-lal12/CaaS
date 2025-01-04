"use client"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Loader2 } from "lucide-react"
import axios from "axios"

function ContainerStatusBadge({ container_name }: { container_name: string }) {
  const [status, setStatus] = useState("fetching")
  useEffect(() => {
    axios
      .get(`/ws/metrics/container/status?container_id=${container_name}`)
      .then((res) => {
        setStatus(() => {
          return res.data.state === true ? "running" : "stopped"
        })
      })
      .catch(() => {
        console.log("Failed to fetch container status")
      })
  }, [container_name])
  return status === "fetching" ? (
    <Loader2 className="animate-spin text-right" />
  ) : (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Badge variant={status as any}>{status}</Badge>
  )
}

export default ContainerStatusBadge
