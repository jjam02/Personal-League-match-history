import { useState } from "react";

export default function useSummoner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [matches, setMatches] = useState([]);
}
