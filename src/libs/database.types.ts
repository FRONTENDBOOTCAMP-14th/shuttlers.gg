export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bk_tournaments: {
        Row: {
          account_bank: string | null
          account_holder: string | null
          account_number: string | null
          apply_end: string | null
          apply_start: string | null
          category: string | null
          contact_primary: string | null
          contacts: string[] | null
          detail_kv: Json | null
          detail_rows: Json
          detail_url: string | null
          end_date: string | null
          event_end: string | null
          event_start: string | null
          fee_amount: number | null
          fee_raw: string | null
          host: string | null
          inserted_at: string
          organizer: string | null
          parsed: Json | null
          poster_url: string | null
          raw: Json
          region: string | null
          sponsor: string | null
          start_date: string | null
          start_month: string | null
          supporter: string | null
          title: string
          tnmt_id: string
          updated_at: string
        }
        Insert: {
          account_bank?: string | null
          account_holder?: string | null
          account_number?: string | null
          apply_end?: string | null
          apply_start?: string | null
          category?: string | null
          contact_primary?: string | null
          contacts?: string[] | null
          detail_kv?: Json | null
          detail_rows?: Json
          detail_url?: string | null
          end_date?: string | null
          event_end?: string | null
          event_start?: string | null
          fee_amount?: number | null
          fee_raw?: string | null
          host?: string | null
          inserted_at?: string
          organizer?: string | null
          parsed?: Json | null
          poster_url?: string | null
          raw: Json
          region?: string | null
          sponsor?: string | null
          start_date?: string | null
          start_month?: string | null
          supporter?: string | null
          title: string
          tnmt_id: string
          updated_at?: string
        }
        Update: {
          account_bank?: string | null
          account_holder?: string | null
          account_number?: string | null
          apply_end?: string | null
          apply_start?: string | null
          category?: string | null
          contact_primary?: string | null
          contacts?: string[] | null
          detail_kv?: Json | null
          detail_rows?: Json
          detail_url?: string | null
          end_date?: string | null
          event_end?: string | null
          event_start?: string | null
          fee_amount?: number | null
          fee_raw?: string | null
          host?: string | null
          inserted_at?: string
          organizer?: string | null
          parsed?: Json | null
          poster_url?: string | null
          raw?: Json
          region?: string | null
          sponsor?: string | null
          start_date?: string | null
          start_month?: string | null
          supporter?: string | null
          title?: string
          tnmt_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      parties: {
        Row: {
          amount: number | null
          created_at: string | null
          creator_id: string
          date: string
          end_time: string | null
          gender: string | null
          grade: string | null
          id: string
          location: string
          max_participants: number | null
          notice: string | null
          participants: Json | null
          shuttle_cock: number | null
          start_time: string | null
          status: string
          title: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          creator_id: string
          date: string
          end_time?: string | null
          gender?: string | null
          grade?: string | null
          id?: string
          location: string
          max_participants?: number | null
          notice?: string | null
          participants?: Json | null
          shuttle_cock?: number | null
          start_time?: string | null
          status?: string
          title: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          creator_id?: string
          date?: string
          end_time?: string | null
          gender?: string | null
          grade?: string | null
          id?: string
          location?: string
          max_participants?: number | null
          notice?: string | null
          participants?: Json | null
          shuttle_cock?: number | null
          start_time?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "parties_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      party_participants: {
        Row: {
          id: string
          joined_at: string
          party_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          party_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          party_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "party_participants_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "party_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      player_stats: {
        Row: {
          best_rank: number | null
          competition_type: Database["public"]["Enums"]["competition_enum"]
          event_type: Database["public"]["Enums"]["event_enum"]
          grade: Database["public"]["Enums"]["grade_enum"]
          histories: Json
          id: string
          losses: number
          partners: Json
          player_id: string
          updated_at: string
          wins: number
        }
        Insert: {
          best_rank?: number | null
          competition_type: Database["public"]["Enums"]["competition_enum"]
          event_type: Database["public"]["Enums"]["event_enum"]
          grade: Database["public"]["Enums"]["grade_enum"]
          histories?: Json
          id?: string
          losses?: number
          partners?: Json
          player_id: string
          updated_at?: string
          wins?: number
        }
        Update: {
          best_rank?: number | null
          competition_type?: Database["public"]["Enums"]["competition_enum"]
          event_type?: Database["public"]["Enums"]["event_enum"]
          grade?: Database["public"]["Enums"]["grade_enum"]
          histories?: Json
          id?: string
          losses?: number
          partners?: Json
          player_id?: string
          updated_at?: string
          wins?: number
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          created_at: string
          gender: Database["public"]["Enums"]["gender_enum"]
          id: string
          local_grade: Database["public"]["Enums"]["grade_enum"]
          name: string
          national_grade: Database["public"]["Enums"]["grade_enum"]
          role: Database["public"]["Enums"]["role_enum"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          gender: Database["public"]["Enums"]["gender_enum"]
          id?: string
          local_grade: Database["public"]["Enums"]["grade_enum"]
          name: string
          national_grade: Database["public"]["Enums"]["grade_enum"]
          role?: Database["public"]["Enums"]["role_enum"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          gender?: Database["public"]["Enums"]["gender_enum"]
          id?: string
          local_grade?: Database["public"]["Enums"]["grade_enum"]
          name?: string
          national_grade?: Database["public"]["Enums"]["grade_enum"]
          role?: Database["public"]["Enums"]["role_enum"]
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          gender: string | null
          id: string
          name: string | null
          national_grade: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          name?: string | null
          national_grade?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          name?: string | null
          national_grade?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      player_stats_summary: {
        Row: {
          best_rank: number | null
          competition_type:
            | Database["public"]["Enums"]["competition_enum"]
            | null
          event_type: Database["public"]["Enums"]["event_enum"] | null
          games: number | null
          grade: Database["public"]["Enums"]["grade_enum"] | null
          player_id: string | null
          total_losses: number | null
          total_wins: number | null
          win_rate: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      competition_enum: "national" | "local"
      event_enum: "single" | "double"
      gender_enum: "male" | "female"
      grade_enum: "A" | "B" | "C" | "D" | "초심" | "준자강" | "자강"
      local_grade_enum: "A" | "B" | "C" | "D" | "초심"
      national_grade_enum: "A" | "B" | "C" | "D" | "초심" | "준자강" | "자강"
      role_enum: "amateur" | "pro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      competition_enum: ["national", "local"],
      event_enum: ["single", "double"],
      gender_enum: ["male", "female"],
      grade_enum: ["A", "B", "C", "D", "초심", "준자강", "자강"],
      local_grade_enum: ["A", "B", "C", "D", "초심"],
      national_grade_enum: ["A", "B", "C", "D", "초심", "준자강", "자강"],
      role_enum: ["amateur", "pro"],
    },
  },
} as const
