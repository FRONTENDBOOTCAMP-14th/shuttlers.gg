export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '13.0.5';
  };
  public: {
    Tables: {
      bk_tournaments: {
        Row: {
          account_bank: string | null;
          account_holder: string | null;
          account_number: string | null;
          apply_end: string | null;
          apply_start: string | null;
          category: string | null;
          contact_primary: string | null;
          contacts: string[] | null;
          detail_kv: Json | null;
          detail_rows: Json;
          detail_url: string | null;
          end_date: string | null;
          event_end: string | null;
          event_start: string | null;
          fee_amount: number | null;
          fee_raw: string | null;
          host: string | null;
          inserted_at: string;
          organizer: string | null;
          parsed: Json | null;
          poster_url: string | null;
          raw: Json;
          region: string | null;
          sponsor: string | null;
          start_date: string | null;
          start_month: string | null;
          supporter: string | null;
          title: string;
          tnmt_id: string;
          updated_at: string;
        };
        users: {
          Row: { id: string; email: string /* ... */ };
          Insert: { id?: string; email: string /* ... */ };
          Update: { email?: string /* ... */ };
          Relationships: [];
        };
        player_card: {
          Row: {
            id: string;
            name: string | null;
            gender: 'male' | 'female' | 'other' | null;
            grade: '초심' | 'D' | 'C' | 'B' | 'A' | null;
          };
          Insert: {
            id: string;
            name?: string | null;
            gender?: 'male' | 'female' | 'other' | null;
            grade?: '초심' | 'D' | 'C' | 'B' | 'A' | null;
          };
          Update: {
            name?: string | null;
            gender?: 'male' | 'female' | 'other' | null;
            grade?: '초심' | 'D' | 'C' | 'B' | 'A' | null;
          };
          Relationships: [
            {
              foreignKeyName: 'player_card_id_fkey';
              columns: ['id'];
              isOneToOne: true;
              referencedRelation: 'users';
              referencedColumns: ['id'];
            },
          ];
        };
        Insert: {
          account_bank?: string | null;
          account_holder?: string | null;
          account_number?: string | null;
          apply_end?: string | null;
          apply_start?: string | null;
          category?: string | null;
          contact_primary?: string | null;
          contacts?: string[] | null;
          detail_kv?: Json | null;
          detail_rows?: Json;
          detail_url?: string | null;
          end_date?: string | null;
          event_end?: string | null;
          event_start?: string | null;
          fee_amount?: number | null;
          fee_raw?: string | null;
          host?: string | null;
          inserted_at?: string;
          organizer?: string | null;
          parsed?: Json | null;
          poster_url?: string | null;
          raw: Json;
          region?: string | null;
          sponsor?: string | null;
          start_date?: string | null;
          start_month?: string | null;
          supporter?: string | null;
          title: string;
          tnmt_id: string;
          updated_at?: string;
        };
        Update: {
          account_bank?: string | null;
          account_holder?: string | null;
          account_number?: string | null;
          apply_end?: string | null;
          apply_start?: string | null;
          category?: string | null;
          contact_primary?: string | null;
          contacts?: string[] | null;
          detail_kv?: Json | null;
          detail_rows?: Json;
          detail_url?: string | null;
          end_date?: string | null;
          event_end?: string | null;
          event_start?: string | null;
          fee_amount?: number | null;
          fee_raw?: string | null;
          host?: string | null;
          inserted_at?: string;
          organizer?: string | null;
          parsed?: Json | null;
          poster_url?: string | null;
          raw?: Json;
          region?: string | null;
          sponsor?: string | null;
          start_date?: string | null;
          start_month?: string | null;
          supporter?: string | null;
          title?: string;
          tnmt_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          email: string | null;
          gender: string | null;
          id: string;
          name: string | null;
          national_grade: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          gender?: string | null;
          id?: string;
          name?: string | null;
          national_grade?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          gender?: string | null;
          id?: string;
          name?: string | null;
          national_grade?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      players: {
        Row: {
          id: string;
          name: string | null;
          gender: 'male' | 'female' | 'other' | null;
          grade: '초심' | 'D' | 'C' | 'B' | 'A' | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          gender?: 'male' | 'female' | 'other' | null;
          grade?: '초심' | 'D' | 'C' | 'B' | 'A' | null;
        };
        Update: {
          name?: string | null;
          gender?: 'male' | 'female' | 'other' | null;
          grade?: '초심' | 'D' | 'C' | 'B' | 'A' | null;
        };
        Relationships: [
          {
            foreignKeyName: 'player_card_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
